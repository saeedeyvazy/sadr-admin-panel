import { useEffect, useState } from "react"
import { iaxios } from "../config"
import { API_ORGANIZATION_LIST } from "../constants"

export function useOrgan() {
    const [data, setData] = useState([{}])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchSampleTeacherList() {
            try {
                setIsLoading(true)
                const response = await iaxios.get(API_ORGANIZATION_LIST, { params: { page: 0, size: 1000 } })
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
    return { data, error, isLoading }
}