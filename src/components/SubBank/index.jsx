import { Field } from "formik"
import FormField from "../FormField"
import { useSubBankList } from "./useSubBankLogic"
import { useSelector } from "react-redux"
import { selectedBank } from "../../features/bank/bank.slice"
import { useDispatch } from "react-redux"
import { selectSubBank } from "../../features/subbank/subbank.slice"

export function SubBank({ onchange }) {
    const { theSubBankList, isLoadingSubBank } = useSubBankList()
    const dispatch = useDispatch()
    const bankId = useSelector(selectedBank)

    return (
        <FormField label="زیر بانک" labelFor="subbank">
            <Field onChange={(e) => { onchange('subbank', e.target.value); dispatch(selectSubBank(e.target.value)) }} style={{ textAlign: 'center' }} name="subbank" id="subbank" component="select">
                <option value='0'>هیچکدام</option>
                {
                    !isLoadingSubBank && theSubBankList?.filter(item => item.id_bank == bankId).map((item) => <option value={item.id} key={item.id}>{item.zir_onvan}</option>)
                }
            </Field>
        </FormField>
    )
} 