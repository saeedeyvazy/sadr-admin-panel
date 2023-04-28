import { API_DOREH_LIST } from "../../constants"
import useAxios from "../../hooks/useAxios"
import MultiSelect from "../MultiSelect"

export function DoreSelect({ signal, name, isMulti }) {
    const { response, error, loading } = useAxios({ url: API_DOREH_LIST, method: 'get' })

    return !loading && <MultiSelect isMulti={isMulti} defaultValue={{ value: response[0], label: response[0]?.onvan_dore }} name={name} signal={signal} optionList={response?.map(item => ({ value: item, label: item.onvan_dore }))} />
} 