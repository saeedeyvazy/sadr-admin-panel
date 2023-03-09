export type UserPayloadObject = {
  name: string
  email: string
  avatar: string
}

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

export type BgKey = 'purplePink' | 'pinkRed' | 'bg-hero-pattern'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string
  date: string
  type: TransactionType
  business: string
}

export type Client = {
  id: number
  avatar: string
  login: string
  name: string
  company: string
  city: string
  progress: number
  created: string
  created_mm_dd_yyyy: string
}


export type Teacher = {
  id: number
  fname: string
  lname: string
  jensiyatName: string
  codemelli: string
  mob: string
  taholName: string
  address: string
  pic: string,
  mahalsodor: string,
  tkmelli: string,
  ttmoalem: string
}


export type Document = {
  id: number
  saat: string
  moadel: string
  sal_akhz: string
  codemelli: string
  vaziat: number
  tozih: string
  onvan_dore: string
  pic: string,
  mahal_dore: string,

}


export type Organization = {
  id_organ: number
  shahrestan: string
  onvan_raiis: string
  name_raiis: string
  onvan_karshenas: string
  name_karshenas: string
  id: number
}
type UserRole = {
  id: number,
  name: string,
  authority: string
}
export type User = {
  id: number
  username: string
  password: string
  userType: string
  userTypeName: string
  isActive: string
  typeCode: string
  createdAt: string
  updatedAt: string
  roles: UserRole[]

}

export type StyleKey = 'white' | 'basic'

export type UserForm = {
  name: string
  email: string
}
