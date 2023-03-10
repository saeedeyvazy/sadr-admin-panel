import { Field } from "formik"
import FormField from "../FormField"
import { useBankList } from "./useBankLogic"
import { useDispatch } from "react-redux"
import { selectBank } from "../../features/bank/bank.slice"


export function Bank({ onchange }) {
    const { isLoadingBank, theBankList } = useBankList()
    const dispatch = useDispatch()

    return (
        <FormField label="بانک" labelFor="bank">
            <Field onChange={(e) => { onchange('bank', e.target.value); dispatch(selectBank(e.target.value)) }} style={{ textAlign: 'center' }} name="bank" id="bank" component="select">
                <option value='0'>هیچکدام</option>
                {
                    !isLoadingBank && theBankList?.map((item) => <option value={item.id} key={item.id}>{item.onvan}</option>)
                }
            </Field>
        </FormField>
    )
} 