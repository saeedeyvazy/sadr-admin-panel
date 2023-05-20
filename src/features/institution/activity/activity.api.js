import Cookies from 'universal-cookie'
import { iaxios } from '../../../config'
import { API_ACTIVITY } from '../../../constants'

export async function callFetchActivityApi() {
    try {
        const loggedinUsername = new Cookies().get('username')
        const response = await iaxios.get(`${API_ACTIVITY}?code=${loggedinUsername}&page=0&size=20`)
        return response.data.data.content
    } catch (error) {
        return { error }
    }
}

export const callDeleteActivity = async (id) => {
    try {
        iaxios.delete(`${API_ACTIVITY}/${id}`)
    } catch (error) {
        alert(error)
        return { error }
    }
}

export async function callAddActivityApi(values) {
    try {
        const response = await iaxios.post(API_ACTIVITY, { code_m_kh: new Cookies().get('username'), code_p: values.nationalCode, ozviat: "عضو" })
        return response.data.data   
    } catch (error) {
        alert(error)
        return { error }

    }
}

