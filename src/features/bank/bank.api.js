import { iaxios } from '../../config'
import { API_BANK_LIST } from '../../constants'

export async function callGetBankListApi() {
    const response = await iaxios.get(API_BANK_LIST, {
        data: null,
    })

    if (response.data.data.content) {
        return response.data.data.content
    }
    else {
        return response.data.data
    }
}