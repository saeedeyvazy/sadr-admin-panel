import {
  mdiAccountCircle,
  mdiCardSearch,
  mdiFileDocumentAlert,
  mdiHelpNetwork,
  mdiInformation,
  mdiLock,
  mdiMonitor,
  mdiOfficeBuilding,
  mdiResponsive,
  mdiSquareEditOutline,
  mdiTable,
  mdiTelevisionGuide
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'
import { labels } from './constants/labels'

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
    href: '/document',
    label: 'تایید مدارک',
    icon: mdiFileDocumentAlert,
  },
  {
    href: '/forms',
    label: 'سازماندهی افراد',
    icon: mdiCardSearch,
  },
  {
    href: '/profile',
    label: 'پروفایل کاربر',
    icon: mdiAccountCircle,
  },
  {
    href: '/forms',
    label: 'اطلاعات ثبت شده',
    icon: mdiLock,
  },
  {
    label: 'گزارش کلاسها',
    icon: mdiTable,
    href: '/class-report'
  },
  {
    label: 'دوره های حمایتی',
    icon: mdiHelpNetwork,
    href: '/support'
  },
  {
    label: 'بانکهای اطلاعات',
    icon: mdiInformation,
    href: '/bankMng'
  },
  {
    label: 'درخت آموزشی',
    icon: mdiInformation,
    href: '/learning-tree'
  },
  {
    label: labels.learningConstraint,
    icon: mdiInformation,
    href: '/learning-constraint'
  },
  {
    label: 'موسسات و خانه قرآنی',
    icon: mdiOfficeBuilding,
    href: '/foundation',
  },
  {
    href: '',
    label: 'گزارشات',
    icon: mdiTable,
    target: '_blank',
  },
]

export default menuAside


