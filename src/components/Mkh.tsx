import { Field } from "formik"
import FormField from "./FormField"
import useAxios from "../hooks/useAxios"
import { API_MKH } from "../constants"

export function Mkh({ name }) {
    const { response, loading } = useAxios({ url: API_MKH, method: 'get' })

    return (
        <FormField label="" labelFor={name}>
            <Field style={{ textAlign: 'center' }} name={name} id={name} component="select">
                {
                    !loading && response?.map((item) => <option key={item.id}>{item.onvan}</option>)
                }
            </Field>
        </FormField>
    )
}