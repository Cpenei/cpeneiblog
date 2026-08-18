import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://cpenei.github.io/cpeneiblog/',
  lang: 'zh-CN',
  title: 'Cp*enei_lab',
  favicon: '/favicon.ico',
  subtitle: '优化情商可以更近理论值嘛/kel',
  author: {
    name: '层析析',
    avatar: '/cpeneiblog/avatar.png',
  },
  description: '层析析的个人博客。',
  social: [
    {
      name: 'GitHub',
      link: 'https://github.com/Cpenei',
      icon: 'i-ri-github-line',
      color: '#666084',
    },
    {
      name: 'Bilibili',
      link: 'https://www.bilibili.com/',
      icon: 'i-ri-bilibili-line',
      color: '#666084',
    },
    {
      name: 'X',
      link: 'https://x.com/cpenei101325',
      icon: 'i-ri-twitter-x-fill',
      color: '#666084',
    },
    {
      name: 'E-Mail',
      link: 'mailto:compjin@163.com',
      icon: 'i-ri-mail-line',
      color: '#666084',
    },
    {
      name: 'zhihu',
      link: 'https://www.zhihu.com/',
      icon: 'i-ri-zhihu-fill',
      color: '#666084',
    },
    {
      name: 'xhs',
      link: 'https://www.xiaohongshu.com/user/profile/6787aa11000000000801e762',
      icon: 'i-ri:book-2-line',
      color: '#666084',
    },
    {
      name: 'pixiv',
      link: 'https://www.pixiv.net/users/106488559',
      icon: 'i-ri-parking-box-line',
      color: '#666084',
    },
    {
      name: 'cldmuisc',
      link: 'https://music.163.com/#/user/home?id=1757997486',
      icon: 'i-ri-netease-cloud-music-line',
      color: '#666084',
    }
  ],

  search: {
    enable: true,
  },
})

