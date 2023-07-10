import { API_ASSOSIATION } from "../../constants"
import useAxios from "../../hooks/useAxios"
import MultiSelect from "../MultiSelect"

export function AssosiationSelect({ signal, name, isMulti }) {
    const { response, loading } = useAxios({ url: API_ASSOSIATION, method: 'get' })

    return !loading && <MultiSelect isMulti={isMulti} defaultValue={{ value: response[0], label: response[0]?.onvan_anjoman }} name={name} signal={signal} optionList={response?.map(item => ({ value: item, label: item.onvan_anjoman }))} />
} 