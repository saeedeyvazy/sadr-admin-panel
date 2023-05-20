const API_IP = "http://185.164.73.213"
const API_PORT = "9000"
const API_PREFIX = `${API_IP}:${API_PORT}`

export const API_LOGIN_URL = `${API_PREFIX}/api/auth/signin`
export const API_GENERAL_TEACHER_SEARCH = `${API_PREFIX}/api/teacher`
export const API_SPECIFIC_TEACHER_SEARCH = `${API_PREFIX}/api/teacher/search`
export const API_ORGAN_LIST = `${API_PREFIX}/api/organha`
export const API_DOREH_LIST = `${API_PREFIX}/api/doreha-amozeshi`
export const API_DOC_STATUS_LIST = `${API_PREFIX}/api/tayid-madrak/vaziat`
export const API_BANK_LIST = `${API_PREFIX}/api/bankha?page=0&size=20`
export const API_POSITION_LIST = `${API_PREFIX}/api/doreha-amozeshi/semat`
export const API_MADRAK_LIST = `${API_PREFIX}/api/doreha?page=0&size=1000`
export const API_UPPDATE_DOCUNENT = `${API_PREFIX}/api/tayid-madrak`
export const API_DOC_LIST = `${API_PREFIX}/api/tayid-madrak?page=0&size=10&vaziat=STATUS`
export const API_MADRAK = `${API_PREFIX}/api/doreha`
export const API_GROUP_LIST = `${API_DOREH_LIST}/groh`
export const API_ORGANIZATION_LIST = `${API_PREFIX}/api/organ-shahrestani`
export const API_TOWN_LIST = `${API_PREFIX}/api/address/guilan-shahr`
export const API_USER = `${API_PREFIX}/api/user`
export const API_USER_PASSWORD = `${API_USER}/password`
export const API_USER_TYPE_LIST = `${API_PREFIX}/api/user/type`
export const API_USER_OFFICE_LIST = `${API_PREFIX}/api/m-avvaliye/summary`
export const API_USER_ROLE_LIST = `${API_PREFIX}/api/user/role`
export const API_SUB_BANK_LIST = `${API_PREFIX}/api/ziranavinbankha`
export const API_REPAIR = `${API_PREFIX}/api/sazmandehi`
export const API_CLASS_REPORT = `${API_PREFIX}/api/kelas-report`
export const API_CLASS_STUDENT_INFO = `${API_PREFIX}/api/kelas-report/kelas-student`
export const API_CLASS_INFO = `${API_PREFIX}/api/kelas-report/kelas-student-amar`
export const API_UPDATE_CLASS_ONVAN_DORE = `${API_PREFIX}/api/kelas-report/kelas-onvan`
export const API_UPDATE_CLASS_MOASSESE = `${API_PREFIX}/api/kelas-report/kelas-moassese`
export const API_LEARNING_RIGHT_SIDE = `${API_PREFIX}/api/amozeshi-tree/right-list`
export const API_LEARNING_LEFT_SIDE = `${API_PREFIX}/api/amozeshi-tree/left-list`
export const API_SAVE_LEARN_TREE = `${API_PREFIX}/api/amozeshi-tree/save`
export const API_MKH = `${API_PREFIX}/api/mkh`
export const API_SUPPORT_SEARCH = `${API_PREFIX}/api/dorehaye_hemayati`
export const API_MANAGER_LIST = `${API_PREFIX}/api/institute/modir-amel`
export const API_SEARCH_MANAGER = `${API_PREFIX}/api/institute/teacher/search?page=0&size=20`
export const API_DIRECOR_BOARD_LIST = `${API_PREFIX}/api/institute/h-modire`
export const API_FOUNDER_GROUP = `${API_PREFIX}/api/institute/heat-moases`
export const API_ACTIVITY = `${API_PREFIX}/api/institute/faaliat-amozeshi`