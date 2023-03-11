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

export async function callGetSubBankMngListApi() {
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

export async function callSearchSubBankMngListApi(request) {

    const response = await iaxios.post(API_SUB_BANK_LIST + "/search?page=0&size=200", request)

    if (response.data.data.content) {

        return response.data.data.content
    }
    else {
        return response.data.data
    }
}
