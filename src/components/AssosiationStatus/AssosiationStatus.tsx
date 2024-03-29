import { labels } from "@/constants/labels"
import { useAssosiationState } from "@/hooks/useAssosiationState"
import { Field } from "formik"
import FormField from "../FormField"

export function AssosiationStatus({ setFieldValue, name }) {
    const { data } = useAssosiationState()
    return (
        <FormField label={`${labels.status} ${labels.association}`} labelFor="organ">
            <Field onChange={(e) => { setFieldValue(name, e.target.value) }} style={{ textAlign: 'center' }} name={name} component="select">
                <option value='0'>هیچکدام</option>
                {
                    data?.map((item) => <option value={item.id} key={item.id}>{item.onvan}</option>)
                }
            </Field>
        </FormField>
    )
} 