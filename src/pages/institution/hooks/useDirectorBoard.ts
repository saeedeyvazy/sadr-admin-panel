import { useSnackbar } from "notistack"
import { useEffect } from "react"
import Cookies from "universal-cookie"
import { iaxios } from "../../../config"
import { API_DIRECOR_BOARD_LIST, API_SEARCH_MANAGER } from "../../../constants"
import { labels } from '../../../constants/labels'
import useAxios from "../../../hooks/useAxios"

export function useDirectorBoard() {
    const loggedinUsername = new Cookies().get('username')
    const { response, error, loading } = useAxios({ url: `${API_DIRECOR_BOARD_LIST}/${loggedinUsername}`, method: 'get' })
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (error && error != '')
            enqueueSnackbar(labels.unsucceed, { variant: 'error' })
    }, [error])

    return { response, loading }
}

export async function searchByNatCode(values, setFieldValue) {
    try {
        const response = await iaxios.post(API_SEARCH_MANAGER, { nationalCode: values.nationalCode })
        console.log(response)
        setFieldValue('name', `${response.data.data[0].fname} ${response.data.data[0].lname}`)
    } catch (error) {
        throw new Error(error)

    }
}