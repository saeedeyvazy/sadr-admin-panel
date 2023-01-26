export const localStorageDarkModeKey = 'darkMode'

export const localStorageStyleKey = 'style'

export const containerMaxW = 'xl:max-w-6xl xl:mx-auto'

export const appTitle = 'سامانه صدر'

export const currentPageTitleMap: Record<string, string> = {
    "Profile": "پروفایل",
    "Dashboard": "داشبورد",
    "Login": "پنل مدیریت",
    "Forms": "جستجوی افراد"
}

export const getPageTitle = (currentPageTitle: string) => `${currentPageTitleMap[currentPageTitle]} — ${appTitle}`
