import { API_DOREH_LIST } from "../../constants"
import useAxios from "../../hooks/useAxios"
import MultiSelect from "../MultiSelect"

export function DoreSelect() {
    const { response, error, loading } = useAxios({ url: API_DOREH_LIST, method: 'get' })

    return !loading && <MultiSelect optionList={response?.map(item => ({ value: item, label: item.onvan_dore }))} />
} 