import { Field } from "formik"
import FormField from "../FormField"
import { useDocStatusList } from "./useDocStatusLogic"
import { useDispatch } from "react-redux"
import { selectDoc } from "../../features/document/document.slice"


export function DocStatus({ onChange }) {
    const { isLoadingDocStatus, theDocStatusList } = useDocStatusList()
    const dispatch = useDispatch()

    return (
        <FormField label="وضعیت مدرک" labelFor="status">
            <Field onChange={(e) => { dispatch(selectDoc(e.target.value)); onChange('status', e.target.value) }} style={{ textAlign: 'center' }} name="status" id="status" component="select">
                <option value='0'>هیچکدام</option>
                {
                    !isLoadingDocStatus && theDocStatusList?.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)
                }
            </Field>
        </FormField>
    )
} 