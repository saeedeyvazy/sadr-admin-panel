import Cookies from 'universal-cookie'
import { iaxios } from '../../../config'
import { API_DIRECOR_BOARD_LIST } from '../../../constants'

export async function callFetchDirectorApi() {
    try {
        const loggedinUsername = new Cookies().get('username')
        const response = await iaxios.get(`${API_DIRECOR_BOARD_LIST}/${loggedinUsername}`)
        return response.data.data
    } catch (error) {
        return { error }
    }
}

export const callDeleteBoardMember = async (id) => {
    try {
        iaxios.delete(`${API_DIRECOR_BOARD_LIST}/${id}`)
    } catch (error) {
        alert(error)
        return { error }
    }
}

