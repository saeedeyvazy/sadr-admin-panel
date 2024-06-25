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

const personMenuAside: MenuAsideItem[] = [
  {
    label: labels.officeInfo,
    icon: mdiInformation,
    href: '/person/person-info'
  },
  {
    href: '/institution/manager',
    label: labels.manager,
    icon: mdiAccount,
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

export default personMenuAside
