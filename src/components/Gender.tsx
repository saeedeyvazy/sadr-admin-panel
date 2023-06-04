import { Field } from "formik"
import FormField from "./FormField"

export function Gender({ name, label, help }) {

    return (
        <FormField help={help} label={label} labelFor={name}>
            <Field style={{ textAlign: 'center' }} name={name} id={name} component="select">
                <option value=''>هیچکدام</option>
                <option value='1'>مذکر</option>
                <option value='2'>مونث</option>
                <option value='3'>مختلط</option>
            </Field>
        </FormField>
    )
} 