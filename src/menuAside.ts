import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiVuejs,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'داشبورد',
  },
  {
    href: '/forms',
    label: 'جستجوی افراد',
    icon: mdiTable,
  },
  {
    href: '/tables',
    label: 'آخرین دوره ها',
    icon: mdiSquareEditOutline,
  },
  {
    href: '/learning',
    label: 'تعریف دوره ها',
    icon: mdiTelevisionGuide,
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
  {
    href: '/',
    label: 'تایید مدارک',
    icon: mdiPalette,
  },
  {
    href: '/profile',
    label: 'پروفایل کاربر',
    icon: mdiAccountCircle,
  },
  {
    href: '/login',
    label: 'اطلاعات ثبت شده',
    icon: mdiLock,
  },
  {
    href: '/error',
    label: 'گزارش کلاسها',
    icon: mdiAlertCircle,
  },
  {
    label: 'بانکهای اطلاعات',
    icon: mdiViewList,
  },
  {
    href: 'https://github.com/justboil/admin-one-react-tailwind',
    label: 'موسسات قرآنی',
    icon: mdiGithub,
    target: '_blank',
  },
  {
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    label: 'گزارشات',
    icon: mdiVuejs,
    target: '_blank',
  },
]

export default menuAside
