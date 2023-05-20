import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { API_SEARCH_MANAGER } from "../../../constants"
import { fetchActivity } from "../../../features/institution/activity/activity.slice"

import { iaxios } from '../../../config'


export function useLearnActivity() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchActivity())
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