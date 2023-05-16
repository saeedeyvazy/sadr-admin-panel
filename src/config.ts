
import axios from 'axios'
import Cookie from 'universal-cookie'
import instMenuAside from './InstMenuAside'
import menuAside from './menuAside'

export const localStorageDarkModeKey = 'darkMode'

export const localStorageStyleKey = 'style'

export const containerMaxW = 'xl:max-w-6xl xl:mx-auto'

export const appTitle = 'سامانه صدر'

export const currentPageTitleMap: Record<string, string> = {
    "Profile": "پروفایل",
    "Dashboard": "داشبورد",
    "Login": "پنل مدیریت",
    "Forms": "جستجوی افراد",
    "Document": "جستجوی مدارک",
    "Learning": 'تعریف دوره',
    "Office": 'ادارات شهرستان',
    "User": "کاربران",
    "BankMng": "بانک اطلاعاتی",
    "ClassReport": "گزارش کلاس ها",
    "LearnTree": "درخت آموزشی",
    "Support": "دوره های حمایتی"
}

export const getPageTitle = (currentPageTitle: string) => `${currentPageTitleMap[currentPageTitle]} — ${appTitle}`

export enum UserType { ADMIN, INSTITUTION }

export const UserTypeMenu = new Map([
    [UserType.ADMIN, menuAside],
    [UserType.INSTITUTION, instMenuAside],
])

const defaultOptions = {
    headers: {
        // 'Content-Type': 'application/json',
    },
}

const iaxios = axios.create(defaultOptions)
iaxios.interceptors.request.use(function (config) {
    const cookie = new Cookie()
    const token = cookie.get('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
})

export { iaxios }

