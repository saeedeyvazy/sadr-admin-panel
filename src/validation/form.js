import * as Yup from 'yup'

export const instLoginFormValidation = Yup.object().shape({
    userType: Yup.string().required('Required'),
    username: Yup.string().required('نام کاربری خود را وارد کنید'),
    password: Yup.string().required('رمز عبور خود را وارد کنید')
})