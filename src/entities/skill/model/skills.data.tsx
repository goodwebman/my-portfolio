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

import type { Skill } from './types';

// Кастомные SVG-иконки для брендов, отсутствующих в Simple Icons

/** OpenAI / ChatGPT. */
const ChatGPTIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
  </svg>
);

/** Grok (xAI). */
const GrokIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.994 14.345L18.38 5.898v.008l2.423-2.427c-.043.062-.087.122-.13.182-1.842 2.54-2.74 3.782-2.02 6.89l-.004-.005c.498 2.115-.035 4.461-1.753 6.183-2.167 2.172-5.631 2.655-8.485.7l1.99-.923c1.822.716 3.814.402 5.247-1.033 1.433-1.435 1.755-3.524 1.034-5.263a.85.85 0 00-.834-.2l-5.856 4.33zm-1.208 1.052l-.002.002-5.598 5.628c.355-.489.795-.952 1.234-1.414 1.239-1.304 2.468-2.596 1.718-4.422-1.004-2.443-.42-5.307 1.44-7.169 1.934-1.934 4.78-2.423 7.158-1.442.526.196.985.474 1.342.733l-1.986.918c-1.849-.777-3.967-.249-5.259 1.046-1.749 1.749-2.102 4.782-.053 6.742z" />
  </svg>
);

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
  { id: 'chatgpt', name: 'ChatGPT', icon: <ChatGPTIcon />, category: 'ai', brandColor: '#10A37F', docUrl: 'https://help.openai.com/', usage: 68 },
  { id: 'grok', name: 'Grok', icon: <GrokIcon />, category: 'ai', docUrl: 'https://x.ai/docs', usage: 10 },
];
