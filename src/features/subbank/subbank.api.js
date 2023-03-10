import { iaxios } from '../../config'
import { API_SUB_BANK_LIST } from '../../constants'

export async function callGetSubBankListApi() {
    const response = await iaxios.get(API_SUB_BANK_LIST, {
        data: null,
    })

    if (response.data.data.content) {

        return response.data.data.content
    }
    else {
        return response.data.data
    }
}