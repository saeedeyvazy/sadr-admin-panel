import { Field } from "formik"
import FormField from "./FormField"
import useAxios from "../hooks/useAxios"
import { API_MADRAK_LIST } from "../constants"

export function Madrak({ setFieldValue }) {
    const { response, error, loading } = useAxios({ url: API_MADRAK_LIST, method: 'get' })
    return (
        <FormField label="نوع مدرک" labelFor="madrak">
            <Field onChange={(e) => { setFieldValue('id_organ', e.target.childNodes[e.target.selectedIndex].getAttribute('organId')); setFieldValue('newMadrak', e.target.options[e.target.selectedIndex].text); setFieldValue('madrak', e.target.value) }} style={{ textAlign: 'center' }} name="madrak" id="madrak" component="select">
                <option value='0'>هیچکدام</option>
                {
                    !loading && response?.map((item) => <option value={item.id} /*organId={item.id_organ}*/ key={item.id}>{item.onvan_dore}</option>)
                }
            </Field>
        </FormField>
    )
} 