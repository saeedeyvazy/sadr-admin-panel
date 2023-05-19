import {
  mdiAccount,
  mdiAccountMultipleOutline,
  mdiAccountMultiplePlus
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
]

export default instMenuAside
