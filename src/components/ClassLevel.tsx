import { Field } from "formik"
import FormField from "./FormField"

export function ClassLevel({ name, label, help }) {

    return (
        <FormField help={help} label={label} labelFor={name}>
            <Field style={{ textAlign: 'center' }} name={name} id={name} component="select">
                <option value=''>هیچکدام</option>
                <option value='1'>مستقل</option>
                <option value='2'>حمایتی</option>
            </Field>
        </FormField>
    )
} 