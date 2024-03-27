import type { FooterItem, MainNavItem } from '@/types'

export type SiteConfig = typeof siteConfig

const links = {
  x: 'https://twitter.com/rastreadito',
  github: 'https://github.com/omgismartinez/rastreadito',
  githubAccount: 'https://github.com/omgismartinez',
  discord: 'https://discord.com/users/rastreadito',
  calDotCom: 'https://cal.com/rastreadito',
}

export const siteConfig = {
  name: 'Rastreadito',
  description:
    'Escanea códigos QR para descubrir el origen y la calidad de cada producto.',
  url: 'https://rastreadito.com',
  ogImage: 'https://rastreadito.com/opengraph-image.png',
  links,
  mainNav: [
    {
      title: 'Landing',
      items: [
        {
          title: 'Inicio',
          href: '/',
          description: '',
          items: [],
        },
        {
          title: 'Explorar',
          href: '/explore',
          description: '',
          items: [],
        },
        {
          title: '¿Cómo funciona?',
          href: '/how-it-works',
          description: '',
          items: [],
        },
        {
          title: 'Precios',
          href: '/pricing',
          description: '',
          items: [],
        },
      ],
    },
    {
      title: 'Lobby',
      items: [
        {
          title: 'Cuenta',
          href: '/account',
          description: '',
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
  footerNav: [
    {
      title: 'Credits',
      items: [
        {
          title: 'OneStopShop',
          href: 'https://onestopshop.jackblatch.com',
          external: true,
        },
        {
          title: 'Acme Corp',
          href: 'https://acme-corp.jumr.dev',
          external: true,
        },
        {
          title: 'craft.mxkaske.dev',
          href: 'https://craft.mxkaske.dev',
          external: true,
        },
        {
          title: 'Taxonomy',
          href: 'https://tx.shadcn.com/',
          external: true,
        },
        {
          title: 'shadcn/ui',
          href: 'https://ui.shadcn.com',
          external: true,
        },
      ],
    },
    {
      title: 'Help',
      items: [
        {
          title: 'About',
          href: '/about',
          external: false,
        },
        {
          title: 'Contact',
          href: '/contact',
          external: false,
        },
        {
          title: 'Terms',
          href: '/terms',
          external: false,
        },
        {
          title: 'Privacy',
          href: '/privacy',
          external: false,
        },
      ],
    },
    {
      title: 'Social',
      items: [
        {
          title: 'X',
          href: links.x,
          external: true,
        },
        {
          title: 'GitHub',
          href: links.githubAccount,
          external: true,
        },
        {
          title: 'Discord',
          href: links.discord,
          external: true,
        },
        {
          title: 'cal.com',
          href: links.calDotCom,
          external: true,
        },
      ],
    },
    {
      title: 'Lofi',
      items: [
        {
          title: 'beats to study to',
          href: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
          external: true,
        },
        {
          title: 'beats to chill to',
          href: 'https://www.youtube.com/watch?v=rUxyKA_-grg',
          external: true,
        },
        {
          title: 'a fresh start',
          href: 'https://www.youtube.com/watch?v=rwionZbOryo',
          external: true,
        },
        {
          title: 'coffee to go',
          href: 'https://www.youtube.com/watch?v=2gliGzb2_1I',
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
}