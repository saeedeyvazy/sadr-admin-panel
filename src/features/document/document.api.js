import { iaxios } from '../../config'
import { API_DOC_LIST, API_DOC_STATUS_LIST } from '../../constants'

export async function callGetDocStatusListApi() {
    const response = await iaxios.get(API_DOC_STATUS_LIST, {
        data: null,
    })

    if (response.data.data.content) {
        return response.data.data.content
    }
    else {
        return response.data.data
    }
}


export async function callGetDocumentList(status) {
    const response = await iaxios.get(API_DOC_LIST.replace("STATUS", status), {
        data: null,
    })

    if (response.data.data.content) {
        return response.data.data.content
    }
    else {
        return response.data.data
    }
}