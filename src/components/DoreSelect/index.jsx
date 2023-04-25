import { API_DOREH_LIST } from "../../constants"
import useAxios from "../../hooks/useAxios"
import MultiSelect from "../MultiSelect"

export function DoreSelect({ signal, name }) {
    const { response, error, loading } = useAxios({ url: API_DOREH_LIST, method: 'get' })

    return !loading && <MultiSelect name={name} signal={signal} optionList={response?.map(item => ({ value: item, label: item.onvan_dore }))} />
} 