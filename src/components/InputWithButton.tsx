import { Field } from "formik"
import { mdiSearchWeb } from "@mdi/js"
import BaseButton from "@component/BaseButton"

type InputWithButtinProps = {
    p: unknown
}
export function InputWithButton(props: InputWithButtinProps) {
    return <Field component={({ ...props }) =>
        <div className={`border border-red-500 flex ${props}}`}>
            <input className="w-full h-full" onChange={() => console.log(props)}></input>
            <BaseButton icon={mdiSearchWeb} />
        </div>}
    >
    </Field>
}