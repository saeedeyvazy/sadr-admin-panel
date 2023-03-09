import { useEffect, useState } from "react"
import { iaxios } from "../config"
import { API_GENERAL_TEACHER_SEARCH } from "../constants"

export function useTeacher() {
    const [data, setData] = useState([{}])
    const [error, setError] = useState("")
    const [totalTeacherLength, setTotalTeacherLength] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchSampleTeacherList() {
            try {
                setIsLoading(true)
                const response = await iaxios.get(API_GENERAL_TEACHER_SEARCH, { params: { page: 0, size: 5 } })
                setTotalTeacherLength(response.data.data.totalElements)
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
    return { data, error, isLoading, totalTeacherLength }
}