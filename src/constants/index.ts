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
export const API_GROUP_LIST = `${API_DOREH_LIST}/groh`
export const API_ORGANIZATION_LIST = `${API_PREFIX}/api/organ-shahrestani`
export const API_TOWN_LIST = `${API_PREFIX}/api/address/guilan-shahr`
export const API_USER = `${API_PREFIX}/api/user`
export const API_USER_PASSWORD = `${API_USER}/password`
export const API_USER_TYPE_LIST = `${API_PREFIX}/api/user/type`
export const API_USER_OFFICE_LIST = `${API_PREFIX}/api/m-avvaliye/summary`
export const API_USER_ROLE_LIST = `${API_PREFIX}/api/user/role`