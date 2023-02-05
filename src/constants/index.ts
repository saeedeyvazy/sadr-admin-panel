const API_IP = "http://185.164.73.213"
const API_PORT = "9000"
const API_PREFIX = `${API_IP}:${API_PORT}`

export const API_LOGIN_URL = `${API_PREFIX}/api/auth/signin`
export const API_GENERAL_TEACHER_SEARCH = `${API_PREFIX}/api/teacher`
export const API_SPECIFIC_TEACHER_SEARCH = `${API_PREFIX}/api/teacher/search`
export const API_ORGAN_LIST = `${API_PREFIX}/api/organha`
export const API_DOREH_LIST = `${API_PREFIX}/api/doreha-amozeshi`
export const API_POSITION_LIST = `${API_PREFIX}/api/doreha-amozeshi/semat`
export const API_MADRAK_LIST = `${API_PREFIX}/api/doreha?page=0&size=1000`
export const API_MADRAK = `${API_PREFIX}/api/doreha`