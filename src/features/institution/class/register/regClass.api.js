import { API_REG_CLASS } from '@/constants'
import Cookies from 'universal-cookie'
import { iaxios } from '../../../../config'

// export async function callFetchDirectorApi() {
//     try {
//         const loggedinUsername = new Cookies().get('username')
//         const response = await iaxios.get(`${API_DIRECOR_BOARD_LIST}/${loggedinUsername}`)
//         return response.data.data
//     } catch (error) {
//         return { error }
//     }
// }

// export const callDeleteBoardMember = async (id) => {
//     try {
//         iaxios.delete(`${API_DIRECOR_BOARD_LIST}/${id}`)
//     } catch (error) {
//         alert(error)
//         return { error }
//     }
// }

export async function callAddClassApi(values) {
    try {
        const {
            onvan,
            tedadsherkatkonande,
            shahrestan,
            codeteacher,
            jensiyat,
            ttf,
            id_hemayati
        } = values
        const response = await iaxios.post(API_REG_CLASS
            , {
                codequran: new Cookies().get('username'),
                codemoassese: new Cookies().get('userType'),
                onvan,
                tedadsherkatkonande,
                shahrestan,
                codeteacher,
                jensiyat,
                ttf,
                id_hemayati
            }
        )
        return response.data.data
    } catch (error) {
        alert(error)
        return { error }

    }
}

