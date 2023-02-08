
import axios from 'axios'
import Cookie from 'universal-cookie'

export const localStorageDarkModeKey = 'darkMode'

export const localStorageStyleKey = 'style'

export const containerMaxW = 'xl:max-w-6xl xl:mx-auto'

export const appTitle = 'سامانه صدر'

export const currentPageTitleMap: Record<string, string> = {
    "Profile": "پروفایل",
    "Dashboard": "داشبورد",
    "Login": "پنل مدیریت",
    "Forms": "جستجوی افراد",
    "Learning": 'تعریف دوره',
    "Office": 'ادارات شهرستان',
    "User": "کاربران"
}

export const getPageTitle = (currentPageTitle: string) => `${currentPageTitleMap[currentPageTitle]} — ${appTitle}`


const defaultOptions = {
    headers: {
        // 'Content-Type': 'application/json',
    },
}

const iaxios = axios.create(defaultOptions)
// Set the AUTH token for any request
iaxios.interceptors.request.use(function (config) {
    const cookie = new Cookie()
    const token = cookie.get('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
})

export { iaxios }
