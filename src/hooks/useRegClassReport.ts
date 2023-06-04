import { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import { iaxios } from "../config"
import { API_REG_CLASS } from "../constants"

export function useRegClassReport() {
    const [data, setData] = useState([{}])
    const [error, setError] = useState("")
    const [totalClassReportLen, setTotalClassReportLen] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchSampleTeacherList() {
            try {
                setIsLoading(true)
                const response = await iaxios.post(API_REG_CLASS + "/search", {
                    "codequran": new Cookies().get('username'),
                    "tshs": "",
                    "lname": "",
                    "onvan_dore": "",
                    "codemelli": "",
                    "codek": ""
                }, { params: { page: 4, size: 5 } })

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