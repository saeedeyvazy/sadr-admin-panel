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
  mdiReproduction,
  mdiOfficeBuilding,
  mdiInformation,
  mdiFileDocumentAlert,
  mdiCardSearch,
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
    icon: mdiCardSearch,
  },
  {
    href: '/tables',
    label: 'آخرین دوره ها',
    icon: mdiTelevisionGuide,
  },
  {
    href: '/learning',
    label: 'تعریف دوره ها',
    icon: mdiSquareEditOutline,
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
    href: '',
    label: 'تایید مدارک',
    icon: mdiFileDocumentAlert,
    target: '_blank',
  },
  {
    href: '/profile',
    label: 'پروفایل کاربر',
    icon: mdiAccountCircle,
  },
  {
    href: '',
    label: 'اطلاعات ثبت شده',
    icon: mdiLock,
    target: '_blank',
  },
  {
    href: '',
    label: 'گزارش کلاسها',
    icon: mdiTable,
    target: '_blank',
  },
  {
    label: 'بانکهای اطلاعات',
    icon: mdiInformation,
    target: '_blank',
  },
  {
    href: '',
    label: 'موسسات قرآنی',
    icon: mdiOfficeBuilding,
    target: '_blank',
  },
  {
    href: '',
    label: 'گزارشات',
    icon: mdiTable,
    target: '_blank',
  },
]

export default menuAside
