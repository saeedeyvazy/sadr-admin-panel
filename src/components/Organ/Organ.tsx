import { Field } from "formik"
import FormField from "../FormField"
import { useOrganList } from "./useOrganLogic"

export function Organ({ setFieldValue }) {
    const { theOrganList, isLoadingOrgan } = useOrganList()
    return (
        <FormField label="ارگان صادر کننده مدرک" labelFor="organ">
            <Field onChange={(e) => { setFieldValue('newOrgan', e.target.options[e.target.selectedIndex].text); setFieldValue('organ', e.target.value) }} style={{ textAlign: 'center' }} name="organ" id="organ" component="select">
                <option value='0'>هیچکدام</option>
                {
                    !isLoadingOrgan && theOrganList?.map((item) => <option value={item.id} key={item.id}>{item.name_organ}</option>)
                }
            </Field>
        </FormField>
    )
} 