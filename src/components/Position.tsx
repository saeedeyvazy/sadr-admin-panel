import { Field } from "formik"
import FormField from "./FormField"
import useAxios from "../hooks/useAxios"
import { API_POSITION_LIST } from "../constants"

export function Position({ name }) {
    const { response, error, loading } = useAxios({ url: API_POSITION_LIST, method: 'get' })
    console.log(response)
    return (
        <FormField label="" labelFor={name}>
            <Field style={{ textAlign: 'center' }} name={name} id={name} component="select">
                {
                    !loading && response?.map((item) => <option key={item.id}>{item.name}</option>)
                }
            </Field>
        </FormField>
    )
}