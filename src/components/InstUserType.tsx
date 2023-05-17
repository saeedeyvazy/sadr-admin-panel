import { Field } from "formik"
import FormField from "./FormField"

export function InstUserType({ name, label, help }) {

    return (
        <FormField help={help} label={label} labelFor={name}>
            <Field style={{ textAlign: 'center' }} name={name} id={name} component="select">
                <option value=''>هیچکدام</option>
                <option value='1'>موسسه</option>
                <option value='2'>خانه قرآن شهری</option>
                <option value='3'>خانه قرآن روستایی</option>
            </Field>
        </FormField>
    )
} 