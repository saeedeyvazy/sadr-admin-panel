import {
  mdiAccessPoint,
  mdiAccount,
  mdiAccountMultipleOutline,
  mdiAccountMultiplePlus,
  mdiBookOpenVariant,
  mdiPencil,
  mdiRadioTower
} from '@mdi/js'
import { labels } from './constants/labels'
import { MenuAsideItem } from './interfaces'

const instMenuAside: MenuAsideItem[] = [
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
    label: labels.activity,
    icon: mdiBookOpenVariant,
    menu: [
      { href: '/institution/learning-activity', label: labels.learning, icon: mdiPencil },
      { href: '/institution/advertise-activity', label: labels.advertise, icon: mdiRadioTower },
      { href: '/institution/search-activity', label: labels.search, icon: mdiAccessPoint },
    ]
  },
]

export default instMenuAside
