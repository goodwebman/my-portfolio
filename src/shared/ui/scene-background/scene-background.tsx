'use client';

import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import type { Theme } from '@/shared/theme';
import { useTheme } from '@/shared/theme';

interface IScenePalette {
  /** [gradientA, gradientB, accent] в linear-ish RGB 0..1 — под `uniform3fv`. */
  readonly colorA: number[];
  readonly colorB: number[];
  readonly accent: number[];
  readonly grain: number;
}

/** Палитра фона по темам. Массивы мутабельны (`number[]`) — того требует WebGL API. */
const PALETTE: Record<Theme, IScenePalette> = {
  dark: {
    colorA: [0.039, 0.055, 0.09], // #0a0e17
    colorB: [0.082, 0.106, 0.18], // #151b2e
    accent: [0.545, 0.482, 1.0], // #8b7bff
    grain: 0.05,
  },
  light: {
    colorA: [0.968, 0.955, 1.0], // #f7f4ff
    colorB: [0.925, 0.906, 0.968], // #ece7f7
    accent: [0.486, 0.227, 0.929], // #7c3aed
    grain: 0.035,
  },
};

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;      // в пикселях фреймбуфера (origin снизу-слева)
uniform float uActive;    // 0..1 — сила spotlight (для touch fade-out)
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uAccent;
uniform float uGrain;
uniform float uReduced;   // 1.0 — prefers-reduced-motion
uniform float uRainStrength; // 1.0 — rain on (dark theme)

// --- Ashima 2D simplex noise ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                 + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Дешёвый white-noise хеш — для мелкого film grain.
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// --- Rain particles (star-like, react to cursor, dark theme only) ---
float rainParticle(vec2 uv, float time, float layer, vec2 mouseUV) {
  float gridW = 50.0;
  float gridH = 60.0 + layer * 5.0;
  float layerScale = 1.0 + layer * 1.5;
  float speed = (1.2 + layer * 0.6) * 0.15;

  vec2 g = uv * vec2(gridW, gridH) / layerScale + vec2(0.0, time * speed);
  vec2 cell = floor(g);
  vec2 f = fract(g) - 0.5;

  // Mouse position in grid space (для расчёта отталкивания)
  vec2 mouseGrid = mouseUV * vec2(gridW, gridH) / layerScale - vec2(0.0, time * speed);

  float body = 0.0;

  for (int ix = 0; ix < 3; ix++) {
    for (int iy = 0; iy < 3; iy++) {
      vec2 n = vec2(float(ix) - 1.0, float(iy) - 1.0);
      vec2 nc = cell + n;
      vec2 nf = f - n;

      float seed = dot(nc, vec2(127.1, 311.7)) + layer * 100.0;
      float r1 = fract(sin(seed) * 43758.5453);
      float r2 = fract(sin(seed * 1.7 + 50.0) * 43758.5453);

      float density = 0.35;
      if (r2 < density) {
        float xPos = (r1 - 0.5) * 0.7;
        float yPos = (r2 / density - 0.5) * 0.6;

        // Mouse repulsion: отклоняем частицу от курсора
        vec2 particleGrid = nc + vec2(xPos, yPos);
        vec2 diff = particleGrid - mouseGrid;
        float dist = length(diff);
        float repelX = 0.0, repelY = 0.0;
        if (dist < 4.0 && dist > 0.001) {
          float force = (1.0 - dist / 4.0) * 3.0;
          repelX = diff.x / dist * force;
          repelY = diff.y / dist * force;
        }

        float dx = nf.x - xPos - repelX;
        float dy = nf.y - yPos - repelY;

        // Компактная круглая частица (звёздочка)
        float size = 0.035 / layerScale;
        float d2 = dx * dx + dy * dy;
        float particle = exp(-d2 / (size * size * 1.5));

        // Лёгкое мерцание при падении
        float twinkle = 0.8 + 0.2 * sin(time * 3.0 + r1 * 100.0);

        body += particle * (0.25 + 0.45 * r1) * twinkle;
      }
    }
  }

  return clamp(body, 0.0, 0.5);
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  vec2 uv = fc / uResolution;
  vec2 m = uMouse / uResolution;

  // аспект-коррекция расстояний, чтобы spotlight был круглым
  vec2 asp = vec2(uResolution.x / uResolution.y, 1.0);
  float dist = distance(uv * asp, m * asp);

  // базовый диагональный градиент
  float gr = clamp(uv.x * 0.45 + uv.y * 0.55, 0.0, 1.0);
  vec3 base = mix(uColorA, uColorB, gr);

  // displacement: около курсора "раздвигаем" текстуру от центра свечения
  vec2 dir = normalize(uv - m + 1e-5);
  float infl = smoothstep(0.42, 0.0, dist) * uActive;
  vec2 dispUV = uv + dir * infl * 0.035;

  // матовая low-freq текстура (бумага/бетон), медленно дышит
  float drift = uReduced > 0.5 ? 0.0 : uTime * 0.015;
  float tex = snoise(dispUV * asp * 3.2 + vec2(drift, drift * 0.6));
  base += tex * 0.028;

  // spotlight — мягкое accent-свечение с несколькими стопами
  float spot = smoothstep(0.55, 0.0, dist);
  spot = pow(spot, 1.6);
  vec3 col = base + uAccent * spot * 0.20 * uActive;

  // film grain — мелкое зерно, обновляется ~12 раз/сек ("дышит")
  float gt = uReduced > 0.5 ? 0.0 : floor(uTime * 12.0);
  float grain = hash(fc + gt) - 0.5;
  // soft-light-подобное наложение: зерно сильнее в средних тонах
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  float mask = 1.0 - abs(lum - 0.5) * 2.0;
  col += grain * uGrain * (0.5 + 0.5 * mask);

  // Rain particles — 3 слоя, только тёмная тема, off при reduced motion
  float rainIntensity = 0.0;
  if (uRainStrength > 0.5 && uReduced < 0.5) {
    vec2 mouseUV = uMouse / uResolution;
    rainIntensity += rainParticle(uv, uTime, 0.0, mouseUV);
    rainIntensity += rainParticle(uv, uTime, 1.0, mouseUV);
    rainIntensity += rainParticle(uv, uTime, 2.0, mouseUV);
    rainIntensity = clamp(rainIntensity, 0.0, 0.6);
  }
  // Свечение частиц — мягкое additive
  col += vec3(0.5, 0.55, 0.85) * rainIntensity;

  gl_FragColor = vec4(col, 1.0);
}
`;

const DPR_CAP_DESKTOP = 1.5;
const MOUSE_LERP = 0.06;
const TOUCH_FADE_MS = 2500;

const compile = (
  gl: WebGLRenderingContext,
  type: number,
  src: string,
): WebGLShader | null => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

/**
 * Полноэкранный шейдерный фон: матовая процедурная текстура + film grain +
 * spotlight, инерционно следящий за курсором, с displacement noise вокруг него.
 *
 * Производительность: один fullscreen-треугольник, весь эффект — на GPU. rAF
 * ставит только target-координаты (mousemove — passive, без работы в handler);
 * сглаживание и рендер — в кадре. DPR ограничен, зерно обновляется ~12 FPS
 * (квантование времени в шейдере), рендер ставится на паузу в скрытой вкладке.
 * `prefers-reduced-motion` — один статичный кадр без rAF и без реакции на курсор.
 */
export const SceneBackground: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  // Живые значения палитры для рендер-цикла (без пересоздания контекста на смену темы).
  const paletteRef = useRef(PALETTE[theme]);

  useEffect(() => {
    paletteRef.current = PALETTE[theme];
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      depth: false,
      powerPreference: 'low-power',
    });
    if (!gl) return; // нет WebGL — остаётся CSS-фон body

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // fullscreen-треугольник
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {
      resolution: gl.getUniformLocation(program, 'uResolution'),
      time: gl.getUniformLocation(program, 'uTime'),
      mouse: gl.getUniformLocation(program, 'uMouse'),
      active: gl.getUniformLocation(program, 'uActive'),
      colorA: gl.getUniformLocation(program, 'uColorA'),
      colorB: gl.getUniformLocation(program, 'uColorB'),
      accent: gl.getUniformLocation(program, 'uAccent'),
      grain: gl.getUniformLocation(program, 'uGrain'),
      reduced: gl.getUniformLocation(program, 'uReduced'),
      rainStrength: gl.getUniformLocation(program, 'uRainStrength'),
    };

    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fineMq = window.matchMedia('(pointer: fine)');
    let reduced = reduceMq.matches;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const dprCap = isMobile ? 1 : DPR_CAP_DESKTOP;

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      width = Math.floor(canvas.clientWidth * dpr);
      height = Math.floor(canvas.clientHeight * dpr);
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    resize();

    // курсор в пикселях фреймбуфера (origin снизу-слева, как gl_FragCoord)
    let targetX = width / 2;
    let targetY = height / 2;
    let curX = targetX;
    let curY = targetY;
    let activeTarget = fineMq.matches ? 1 : 0.85;
    let active = activeTarget;
    let lastMove = 0;
    let isTouch = false;

    const setTargetFromClient = (clientX: number, clientY: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const rect = canvas.getBoundingClientRect();
      targetX = (clientX - rect.left) * dpr;
      targetY = (rect.height - (clientY - rect.top)) * dpr; // flip Y
      lastMove = performance.now();
      activeTarget = 1;
    };

    const onPointerMove = (e: PointerEvent) => {
      isTouch = e.pointerType === 'touch';
      setTargetFromClient(e.clientX, e.clientY);
    };
    const onResize = () => resize();
    const onReduceChange = (e: MediaQueryListEvent) => {
      reduced = e.matches;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    reduceMq.addEventListener('change', onReduceChange);

    const draw = (time: number) => {
      curX += (targetX - curX) * MOUSE_LERP;
      curY += (targetY - curY) * MOUSE_LERP;

      // touch: гасим spotlight после бездействия
      if (isTouch && lastMove && time - lastMove > TOUCH_FADE_MS) {
        activeTarget = 0;
      }
      active += (activeTarget - active) * 0.05;

      const p = paletteRef.current;
      gl.uniform2f(u.resolution, width, height);
      gl.uniform1f(u.time, time * 0.001);
      gl.uniform2f(u.mouse, curX, curY);
      gl.uniform1f(u.active, active);
      gl.uniform3fv(u.colorA, p.colorA);
      gl.uniform3fv(u.colorB, p.colorB);
      gl.uniform3fv(u.accent, p.accent);
      gl.uniform1f(u.grain, p.grain);
      gl.uniform1f(u.reduced, reduced ? 1 : 0);
      gl.uniform1f(u.rainStrength, p.colorA[0] < 0.5 ? 1 : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    const loop = (time: number) => {
      draw(time);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf && !reduced) {
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    if (reduced) {
      draw(0); // один статичный кадр
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      reduceMq.removeEventListener('change', onReduceChange);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 size-full"
    />
  );
};
