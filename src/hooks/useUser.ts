import { useEffect, useState } from "react"
import { iaxios } from "../config"
import { API_USER } from "../constants"

export function useUser() {
    const [data, setData] = useState([{}])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchUserList() {
            try {
                setIsLoading(true)
                const response = await iaxios.get(API_USER, { params: { page: 0, size: 1000 } })
                setData(response.data.data.content)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setError(error)
                setIsLoading(false)
            }
        }
        fetchUserList()
    }, [])
    return { data, error, isLoading }
}