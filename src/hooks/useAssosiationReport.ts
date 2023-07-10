import { useEffect, useState } from "react"
import { iaxios } from "../config"
import { API_ASSOSIATION } from "../constants"

export function useAssosiationReport() {
    const [data, setData] = useState([{}])
    const [error, setError] = useState("")
    const [totalClassReportLen, setTotalClassReportLen] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchSampleTeacherList() {
            try {
                setIsLoading(true)
                const response = await iaxios.get(API_ASSOSIATION)

                setTotalClassReportLen(response.data.data.totalElements)
                setData(response.data.data.content)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setError(error)
                setIsLoading(false)
            }
        }
        fetchSampleTeacherList()
    }, [])
    return { data, error, isLoading, totalClassReportLen }
}