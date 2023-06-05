import { fetchInsurance } from "@/features/institution/insurance/insurance.slice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { iaxios } from '../../../config'
import { API_SEARCH_MANAGER } from "../../../constants"


export function useInsurance() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchInsurance())
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