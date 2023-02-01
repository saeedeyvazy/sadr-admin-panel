import { Field } from "formik"
import FormField from "./FormField"
import useAxios from "../hooks/useAxios"
import { API_ORGAN_LIST } from "../constants"

export function Organ() {
    const { response, error, loading } = useAxios({ url: API_ORGAN_LIST, method: 'get' })
    return (
        <FormField label="ارگان صادر کننده مدرک" labelFor="organ">
            <Field style={{ textAlign: 'center' }} name="organ" id="organ" component="select">
                {
                    !loading && response?.map((item) => <option key={item.id}>{item.name_organ}</option>)
                }
            </Field>
        </FormField>
    )
}