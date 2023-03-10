import { iaxios } from '../../config'
import { API_REPAIR } from '../../constants'

export async function callCreateRepairApi(request) {
    const response = await iaxios.post(API_REPAIR, {
        data: request,
    })

    if (response.data.data.content) {
        return response.data.data.content
    }
    else {
        return response.data.data
    }
}