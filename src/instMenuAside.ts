import {
  mdiAccessPoint,
  mdiAccount,
  mdiAccountMultipleOutline,
  mdiAccountMultiplePlus,
  mdiAccountPlus,
  mdiBookOpenVariant,
  mdiHelp,
  mdiInformation,
  mdiPencil,
  mdiRadioTower,
  mdiTable,
  mdiTelevision
} from '@mdi/js'
import { labels } from './constants/labels'
import { MenuAsideItem } from './interfaces'

const instMenuAside: MenuAsideItem[] = [
  {
    label: labels.officeInfo,
    icon: mdiInformation,
    href: '/institution/office-info'
  },
  {
    href: '/institution/manager',
    label: labels.manager,
    icon: mdiAccount,
  },
  {
    href: '/institution/director-board',
    label: labels.directorBoard,
    icon: mdiAccountMultipleOutline,
  },
  {
    href: '/institution/founder-group',
    label: labels.founderGroup,
    icon: mdiAccountMultiplePlus,
  },
  {
    label: 'گزارش کلاسها',
    icon: mdiTable,
    href: '/institution/class-report'
  },
  {
    label: 'ثبت کلاس',
    icon: mdiTelevision,
    href: '/institution/register-class'
  },
  {
    label: 'افزودن فرد',
    icon: mdiAccountPlus,
    href: '/institution/add-person'
  },
  {
    label: 'بیمه فعالان قرآنی',
    icon: mdiHelp,
    href: '/institution/insurance'
  },
  {
    label: labels.activity,
    icon: mdiBookOpenVariant,
    menu: [
      { href: '/institution/learning-activity', label: labels.learning, icon: mdiPencil },
      { href: '/institution/advertise-activity', label: labels.advertise, icon: mdiRadioTower },
      { href: '/institution/search-activity', label: labels.research, icon: mdiAccessPoint },
    ]
  },
]

export default instMenuAside
