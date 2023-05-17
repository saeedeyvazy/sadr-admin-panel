import {
  mdiCardSearch,
  mdiMonitor,
  mdiResponsive
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const instMenuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'test',
  },
  {
    href: '/institution/manager',
    label: ' مدیرعامل',
    icon: mdiCardSearch,
  },

  {
    label: 'کاربران',
    icon: mdiResponsive,
    menu: [
      {
        label: 'مدیریت کاربران',
        href: '/user',
      },
      {
        label: 'ادارات شهرستان',
        href: '/office'
      },
    ],
  },

]

export default instMenuAside
