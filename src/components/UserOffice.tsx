import { Field } from "formik"
import FormField from "./FormField"
import useAxios from "../hooks/useAxios"
import { API_USER_OFFICE_LIST } from "../constants"

export function UserOffice({ name, label }) {
    const { response, error, loading } = useAxios({ url: API_USER_OFFICE_LIST, method: 'get' })
    return (
        <FormField label={label} labelFor={name}>
            <Field style={{ textAlign: 'center' }} name={name} id={name} component="select" >
                <option value='0'>هیچکدام</option>
                {
                    !loading && response?.map((item) => <option value={item.code} key={item.code}>{item.nam}</option>)
                }
            </Field>
        </FormField>
    )
} 