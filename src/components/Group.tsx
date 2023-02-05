import { Field } from "formik"
import FormField from "./FormField"
import useAxios from "../hooks/useAxios"
import { API_GROUP_LIST } from "../constants"

export function Group() {
    const { response, error, loading } = useAxios({ url: API_GROUP_LIST, method: 'get' })
    return (
        <FormField label="گروه" labelFor="group">
            <Field style={{ textAlign: 'center' }} name="group" id="group" component="select">
                {
                    !loading && response?.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)
                }
            </Field>
        </FormField>
    )
} 