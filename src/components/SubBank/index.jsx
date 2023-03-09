import { Field } from "formik"
import FormField from "../FormField"
import { useSubBankList } from "./useSubBankLogic"

export function SubBank() {
    const { theSubBankList, isLoadingSubBank } = useSubBankList()

    return (
        <FormField label="زیر بانک" labelFor="bank">
            <Field style={{ textAlign: 'center' }} name="bank" id="bank" component="select">
                <option value='0'>هیچکدام</option>
                {
                    !isLoadingSubBank && theSubBankList?.map((item) => <option value={item.id} key={item.id}>{item.zir_onvan}</option>)
                }
            </Field>
        </FormField>
    )
} 