import { Field } from "formik"
import FormField from "./FormField"
import useAxios from "../hooks/useAxios"
import { API_USER_TYPE_LIST } from "../constants"

export function UserType({ name, label }) {
    const { response, error, loading } = useAxios({ url: API_USER_TYPE_LIST, method: 'get' })
    return (
        <FormField label={label} labelFor={name}>
            <Field style={{ textAlign: 'center' }} name={name} id={name} component="select">
                <option value='0'>هیچکدام</option>
                {
                    !loading && response?.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)
                }
            </Field>
        </FormField>
    )
} 