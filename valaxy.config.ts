import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
  'i-ri-github-line',
  'i-ri-twitter-x-fill',
  'i-ri-bilibili-line',
  'i-ri-mail-line',
  'i-ri-zhihu-fill',
  'i-ri:book-2-line',
  'i-ri-parking-box-line',
  'i-ri-netease-cloud-music-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  vite: {
    base: '/cpeneiblog/',
  },

  theme: 'yun',

  themeConfig: {
    editLink: {
      pattern: 'https://github.com/Cpenei/cpeneiblog/edit/main/:path',
      text: '在 GitHub 上编辑此页',
    },
  
    banner: {
      enable: true,
      title: 'Cp*enei_lab',
    },

    pages: [
      {
        name: '友链',
        url: '/links/',
        icon: 'i-ri-genderless-line',
        color: 'dodgerblue',
      },
      {
        name: 'with',
        url: '/with/',
        icon: 'i-ri-women-line',
        color: 'hotpink',
      },
    ],

    footer: {
      since: 2026,
      beian: {
        enable: true,
        icp: '未报备',
        police: '未报备',
      },
    },
  },

  unocss: { safelist },
})

