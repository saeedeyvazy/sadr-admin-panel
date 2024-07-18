import {
  mdiMenu,
  mdiClockOutline,
  mdiAccount,
  mdiDatabase,
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
        href: '/login'
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
    href: '/login',
  },

  {
    icon: mdiNewspaper,
    label: 'اخبار',
    href: '/login'
  },

]


