import { Field } from "formik"
import FormField from "../FormField"
import { useSubBankList } from "./useSubBankLogic"
import { useSelector } from "react-redux"
import { selectedBank } from "../../features/bank/bank.slice"
import { useEffect } from "react"

export function SubBank() {
    const { theSubBankList, isLoadingSubBank } = useSubBankList()
    const bankId = useSelector(selectedBank)

    return (
        <FormField label="زیر بانک" labelFor="bank">
            <Field style={{ textAlign: 'center' }} name="bank" id="bank" component="select">
                <option value='0'>هیچکدام</option>
                {
                    !isLoadingSubBank && theSubBankList?.filter(item => item.id_bank == bankId).map((item) => <option value={item.id} key={item.id}>{item.zir_onvan}</option>)
                }
            </Field>
        </FormField>
    )
} 