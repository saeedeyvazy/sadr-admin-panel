import { Field } from "formik"
import FormField from "../FormField"
import { useDocStatusList } from "./useDocStatusLogic"


export function DocStatus() {
    const { isLoadingDocStatus, theDocStatusList } = useDocStatusList()
    return (
        <FormField label="وضعیت مدرک" labelFor="status">
            <Field onChange={() => { }} style={{ textAlign: 'center' }} name="status" id="status" component="select">
                <option value='0'>هیچکدام</option>
                {
                    !isLoadingDocStatus && theDocStatusList?.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)
                }
            </Field>
        </FormField>
    )
} 