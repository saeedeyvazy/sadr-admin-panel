import { useAssosiation } from "@/hooks/useAssosiation"
import { Field } from "formik"
import FormField from "../FormField"
import { labels } from "@/constants/labels"

export function AssosiationStatus({ setFieldValue, name }) {
    const { data } = useAssosiation()
    return (
        <FormField label={`${labels.status} ${labels.association}`} labelFor="organ">
            <Field onChange={(e) => { setFieldValue(name, e.target.value) }} style={{ textAlign: 'center' }} name={name} component="select">
                <option value='0'>هیچکدام</option>
                {
                    data?.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)
                }
            </Field>
        </FormField>
    )
} 