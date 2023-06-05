import Cookies from 'universal-cookie'
import { iaxios } from '../../../config'
import { API_INSURANCE } from '../../../constants'

export async function callFetchInsurance() {
    try {
        const user = new Cookies().get('username')
        const response = await iaxios.get(API_INSURANCE, { params: { code_m_kh: user, page: 0, size: 20 } })
        return response.data.data.content
    } catch (error) {
        return { error }
    }
}

export async function callUpdateInsuranceApi(request) {
    try {

        const { code, startClassHour, startClassMinute, endClassHour, endClassMinute } = request
        console.log({ code, startClassHour, startClassMinute, endClassHour, endClassMinute })
        const response = await iaxios.put(API_INSURANCE,
            {
                code,
                ssh: startClassHour,
                dsh: startClassMinute,
                sp: endClassHour,
                dp: endClassMinute
            }
        )
        return response.data.data
    } catch (error) {
        return { error }
    }
}

