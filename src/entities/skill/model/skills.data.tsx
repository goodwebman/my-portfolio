import {
  SiApollographql,
  SiCapacitor,
  SiClaude,
  SiCss,
  SiEslint,
  SiFigma,
  SiFramer,
  SiGit,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMobx,
  SiMui,
  SiNextdotjs,
  SiPrettier,
  SiRadixui,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiSass,
  SiShadcnui,
  SiTailwindcss,
  SiTanstack,
  SiTypescript,
  SiZod,
} from 'react-icons/si';

import { IconChatGPT, IconGrok } from '@/shared/ui/icons';

import type { Skill } from './types';

/**
 * Стек технологий. Иконки — Simple Icons из react-icons/si.
 */
export const SKILLS: readonly Skill[] = [
  // --- frontend ---
  { id: 'typescript', name: 'TypeScript', icon: <SiTypescript />, category: 'frontend', brandColor: '#3178C6', docUrl: 'https://www.typescriptlang.org/docs/', usage: 75 },
  { id: 'html5', name: 'HTML5', icon: <SiHtml5 />, category: 'frontend', brandColor: '#E34F26', docUrl: 'https://developer.mozilla.org/docs/Web/HTML', usage: 95 },
  { id: 'css3', name: 'CSS3', icon: <SiCss />, category: 'frontend', brandColor: '#1572B6', docUrl: 'https://developer.mozilla.org/docs/Web/CSS', usage: 90 },
  { id: 'react', name: 'React', icon: <SiReact />, category: 'frontend', brandColor: '#61DAFB', docUrl: 'https://react.dev', usage: 82 },
  { id: 'nextjs', name: 'NextJS', icon: <SiNextdotjs />, category: 'frontend', docUrl: 'https://nextjs.org/docs', usage: 55 },
  { id: 'javascript', name: 'JavaScript', icon: <SiJavascript />, category: 'frontend', brandColor: '#F7DF1E', docUrl: 'https://developer.mozilla.org/docs/Web/JavaScript', usage: 85 },
  { id: 'scss', name: 'SCSS', icon: <SiSass />, category: 'frontend', brandColor: '#CC6699', docUrl: 'https://sass-lang.com/documentation/', usage: 35 },
  { id: 'tailwind', name: 'Tailwind', icon: <SiTailwindcss />, category: 'frontend', brandColor: '#06B6D4', docUrl: 'https://tailwindcss.com/docs', usage: 60 },
  { id: 'redux', name: 'Redux', icon: <SiRedux />, category: 'frontend', brandColor: '#764ABC', docUrl: 'https://redux.js.org/', usage: 22 },
  { id: 'redux-toolkit', name: 'Redux Toolkit', icon: <SiRedux />, category: 'frontend', brandColor: '#764ABC', docUrl: 'https://redux-toolkit.js.org/', usage: 35 },
  { id: 'mobx', name: 'Mobx', icon: <SiMobx />, category: 'frontend', brandColor: '#FF9955', docUrl: 'https://mobx.js.org/', usage: 6 },
  { id: 'react-hook-form', name: 'React Hook Form', icon: <SiReacthookform />, category: 'frontend', docUrl: 'https://react-hook-form.com/', usage: 45 },
  { id: 'zod', name: 'Zod', icon: <SiZod />, category: 'frontend', docUrl: 'https://zod.dev/', usage: 50 },
  { id: 'tanstack-query', name: 'Tanstack Query', icon: <SiReactquery />, category: 'frontend', brandColor: '#FF4154', docUrl: 'https://tanstack.com/query/latest', usage: 52 },
  { id: 'apollo', name: 'Apollo', icon: <SiApollographql />, category: 'frontend', brandColor: '#311C87', docUrl: 'https://www.apollographql.com/docs/', usage: 8 },
  { id: 'graphql', name: 'GraphQL', icon: <SiGraphql />, category: 'frontend', brandColor: '#E10098', docUrl: 'https://graphql.org/learn/', usage: 15 },
  { id: 'material-ui', name: 'MaterialUI', icon: <SiMui />, category: 'frontend', brandColor: '#007FFF', docUrl: 'https://mui.com/', usage: 18 },
  { id: 'shadcn', name: 'Shadcn', icon: <SiShadcnui />, category: 'frontend', docUrl: 'https://ui.shadcn.com/', usage: 42 },
  { id: 'radix', name: 'RadixUI', icon: <SiRadixui />, category: 'frontend', docUrl: 'https://www.radix-ui.com/', usage: 25 },
  { id: 'motion', name: 'Framer Motion', icon: <SiFramer />, category: 'frontend', brandColor: '#0055FF', docUrl: 'https://motion.dev/docs', usage: 32 },
  { id: 'tanstack-virtual', name: 'Tanstack Virtual', icon: <SiTanstack />, category: 'frontend', docUrl: 'https://tanstack.com/virtual/latest', usage: 10 },
  { id: 'react-router', name: 'React Router', icon: <SiReactrouter />, category: 'frontend', brandColor: '#CA4245', docUrl: 'https://reactrouter.com/', usage: 35 },
  { id: 'capacitor', name: 'Capacitor', icon: <SiCapacitor />, category: 'frontend', brandColor: '#119EFF', docUrl: 'https://capacitorjs.com/docs', usage: 10 },
  { id: 'react-native', name: 'React Native', icon: <SiReact />, category: 'frontend', brandColor: '#61DAFB', docUrl: 'https://reactnative.dev/docs/getting-started', usage: 12 },
  // --- tools ---
  { id: 'git', name: 'GIT', icon: <SiGit />, category: 'tools', brandColor: '#F05032', docUrl: 'https://git-scm.com/doc', usage: 95 },
  { id: 'prettier', name: 'Prettier', icon: <SiPrettier />, category: 'tools', brandColor: '#F7B93E', docUrl: 'https://prettier.io/docs/', usage: 85 },
  { id: 'eslint', name: 'ESLint', icon: <SiEslint />, category: 'tools', brandColor: '#4B32C3', docUrl: 'https://eslint.org/docs/latest/', usage: 90 },
  { id: 'figma', name: 'Figma', icon: <SiFigma />, category: 'tools', brandColor: '#F24E1E', docUrl: 'https://help.figma.com/', usage: 45 },
  // --- ai ---
  { id: 'claude', name: 'Claude', icon: <SiClaude />, category: 'ai', brandColor: '#D97757', docUrl: 'https://docs.anthropic.com/en/docs/', usage: 28 },
  { id: 'chatgpt', name: 'ChatGPT', icon: <IconChatGPT />, category: 'ai', brandColor: '#10A37F', docUrl: 'https://help.openai.com/', usage: 68 },
  { id: 'grok', name: 'Grok', icon: <IconGrok />, category: 'ai', docUrl: 'https://x.ai/docs', usage: 10 },
];
