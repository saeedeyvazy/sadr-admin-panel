import {
  mdiAccount,
  mdiCardSearch,
  mdiMonitor,
  mdiResponsive
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'
import { labels } from './constants/labels'

const instMenuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'test',
  },
  {
    href: '/institution/manager',
    label: ' مدیرعامل',
    icon: mdiAccount,
  },
  {
    href: '/institution/director-board',
    label: labels.directorBoard,
    icon: mdiAccount,
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
