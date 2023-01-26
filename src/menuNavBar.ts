import {
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiGithub,
  mdiVuejs,
} from '@mdi/js'
import { MenuNavBarItem } from './interfaces'

const menuNavBar: MenuNavBarItem[] = [
  {
    icon: mdiMenu,
    label: 'انجمن ها',
    menu: [
      {
        icon: mdiClockOutline,
        label: 'کانون ها',
      },
      {
        icon: mdiCloud,
        label: 'انجمن',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiCrop,
        label: 'گروه ها',
      },
    ],
  },
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'پروفابل من',
        href: '/profile',
      },
      {
        icon: mdiCogOutline,
        label: 'تنظیمات',
      },
      {
        icon: mdiEmail,
        label: 'پیام ها',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'خروج سایت',
        isLogout: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    icon: mdiGithub,
    label: 'GitHub',
    isDesktopNoLabel: true,
    href: 'https://github.com/justboil/admin-one-react-tailwind',
    target: '_blank',
  },
  {
    icon: mdiVuejs,
    label: 'Vue version',
    isDesktopNoLabel: true,
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    target: '_blank',
  },
  {
    icon: mdiLogout,
    label: 'Log out',
    isDesktopNoLabel: true,
    isLogout: true,
  },
]

export default menuNavBar
