import { iaxios } from '../../config'
import { API_ORGAN_LIST } from '../../constants'

export async function callGetOrganListApi() {
    const response = await iaxios.get(API_ORGAN_LIST, {
        data: null,
    })

    if (response.data.data.content) {
        return response.data.data.content
    }
    else {
        return response.data.data
    }
}
