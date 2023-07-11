import { useEffect, useState } from "react"
import { iaxios } from "../config"
import { API_ASSOSIATION_STATUS_LIST } from "../constants"

export function useAssosiation() {
    const [data, setData] = useState([{}])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchuseAssosiationList() {
            try {
                setIsLoading(true)
                const response = await iaxios.get(API_ASSOSIATION_STATUS_LIST)
                setData(response.data.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setError(error)
                setIsLoading(false)
            }
        }
        fetchuseAssosiationList()
    }, [])
    return { data, error, isLoading }
}