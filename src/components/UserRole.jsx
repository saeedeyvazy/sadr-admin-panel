import { API_USER_ROLE_LIST } from "../constants"
import useAxios from "../hooks/useAxios"
import MultiSelect from "./MultiSelect"

export function UserRole({ name, signal }) {
    const { response, error, loading } = useAxios({ url: API_USER_ROLE_LIST, method: 'get' })

    return !loading && <MultiSelect name={name} signal={signal} optionList={response?.map(item => ({ value: item.id, label: item.name }))} />
} 