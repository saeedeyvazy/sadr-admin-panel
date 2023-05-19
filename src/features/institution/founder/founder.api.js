import Cookies from 'universal-cookie'
import { iaxios } from '../../../config'
import { API_FOUNDER_GROUP } from '../../../constants'

export async function callFetchFounderApi() {
    try {
        const loggedinUsername = new Cookies().get('username')
        const response = await iaxios.get(`${API_FOUNDER_GROUP}/${loggedinUsername}`)
        return response.data.data
    } catch (error) {
        return { error }
    }
}

export const callDeleteFounder = async (id) => {
    try {
        iaxios.delete(`${API_FOUNDER_GROUP}/${id}`)
    } catch (error) {
        alert(error)
        return { error }
    }
}

export async function callAddFounderApi(values) {
    try {
        const response = await iaxios.post(API_FOUNDER_GROUP, { code_m_kh: new Cookies().get('username'), code_p: values.nationalCode, ozviat: "عضو" })
        return response.data.data
    } catch (error) {
        alert(error)
        return { error }

    }
}

