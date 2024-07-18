import {
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiDatabase,
  mdiCalculator,
  mdiNewspaper,
  mdiOfficeBuilding,

} from '@mdi/js'
import { MenuNavBarItem } from '../../interfaces'

export const landingMenuNavBar: MenuNavBarItem[] = [
  {
    icon: mdiMenu,
    label: 'ورود',
    menu: [
      {
        icon: mdiAccount,
        label: 'مدیریت سامانه',
        href: '/person-login'
      },
      {
        icon: mdiClockOutline,
        label: 'پنل اشخاص',
        href: '/person-login'
      },
      {
        icon: mdiOfficeBuilding,
        label: 'موسسات و خانه های قرآنی',
        href: '/inst-login'
      },
      {
        isDivider: true,
      },
    ],
  },
  {
    icon: mdiDatabase,
    label: 'بانک های اطلاعات',
    href: '/',
  },
  {
    icon: mdiCalculator,
    label: 'محاسبه حق الزحمه مربیان',
    href: '/'
  },
  {
    icon: mdiNewspaper,
    label: 'اخبار',
    href: '/'
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },

]


