import { useEffect, useState } from "react"
import { iaxios } from "../config"
import { API_PERSON_ACADEMIC_INFO, API_SPECIFIC_TEACHER_SEARCH } from "../constants"
import Cookies from "universal-cookie"

export function usePersonAcademic() {
    const [data, setData] = useState([{}])
    const [error, setError] = useState("")
    const [totalTeacherLength, setTotalTeacherLength] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchPersonAcademicList() {
            try {
                setIsLoading(true)
                const response = await iaxios.get(API_PERSON_ACADEMIC_INFO,
                    { params: { page: 0, size: 5, code: new Cookies().get('username') } }
                )
                setTotalTeacherLength(response.data.data.totalElements)

                setData(response.data.data.content)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setError(error)
                setIsLoading(false)
            }
        }
        fetchPersonAcademicList()
    }, [])
    return { data, error, isLoading, totalTeacherLength }
}