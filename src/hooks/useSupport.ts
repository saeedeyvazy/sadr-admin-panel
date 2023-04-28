import { useEffect, useState } from "react"
import { iaxios } from "../config"
import { API_SUPPORT_SEARCH } from "../constants"

export function useSupport() {
    const [data, setData] = useState([{}])
    const [error, setError] = useState("")
    const [totalClassReportLen, setTotalClassReportLen] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchSupportList() {
            try {
                setIsLoading(true)
                const response = await iaxios.get(API_SUPPORT_SEARCH)

                setTotalClassReportLen(response.data.data.totalElements)
                setData(response.data.data.content)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setError(error)
                setIsLoading(false)
            }
        }
        fetchSupportList()
    }, [])
    return { data, error, isLoading, totalClassReportLen }
}