import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { API_MANAGER_LIST } from "../../../constants"
import { username } from "../../../features/login/login.slice"
import useAxios from "../../../hooks/useAxios"
import { useSelector } from "react-redux"

export function useManager() {
    const loggedinUsername = useSelector(username)
    const { response, error, loading } = useAxios({ url: `${API_MANAGER_LIST}/${loggedinUsername}`, method: 'get' })
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (error && error != '')
            enqueueSnackbar('خطا در بازیابی لیست مدیران عامل', { variant: 'error' })
    }, [error])

    return { response, loading }
}