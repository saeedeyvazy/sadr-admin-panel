import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { API_SEARCH_MANAGER } from "../../../constants"
import Cookies from 'universal-cookie'
import { iaxios } from '../../../config'
import { API_DIRECOR_BOARD_LIST } from '../../../constants'
import { fetchFounderGroup } from "../../../features/institution/founder/founder.slice"


export function useFounder() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFounderGroup())
    }, [])
}

export async function searchByNatCode(values, setFieldValue) {
    try {
        const response = await iaxios.post(API_SEARCH_MANAGER, { nationalCode: values.nationalCode })
        setFieldValue('name', `${response.data.data[0].fname} ${response.data.data[0].lname}`)
    } catch (error) {
        alert(error)

    }
}