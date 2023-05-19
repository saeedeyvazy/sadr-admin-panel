import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { API_SEARCH_MANAGER } from "../../../constants"
import { fetchDirectorBoard } from "../../../features/institution/director/director.slice"

import Cookies from 'universal-cookie'
import { iaxios } from '../../../config'
import { API_DIRECOR_BOARD_LIST } from '../../../constants'


export function useDirectorBoard() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDirectorBoard())
    }, [])
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

export async function callFetchDirectorApi() {
    try {
        const loggedinUsername = new Cookies().get('username')
        const response = await iaxios.get(`${API_DIRECOR_BOARD_LIST}/${loggedinUsername}`)

        return response.data.data
    } catch (error) {
        return { error }
    }
}