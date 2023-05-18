import * as Yup from 'yup'

export const instLoginFormValidation = Yup.object().shape({
    userType: Yup.string().required('نوع کاربری را انتخاب کنید'),
    username: Yup.string().required('نام کاربری خود را وارد کنید'),
    password: Yup.string().required('رمز عبور خود را وارد کنید')
})

export const changeManagerValidation = Yup.object().shape({
    nationalCode: Yup.string().required('کد ملی جباریست'),
    name: Yup.string().required('نام اجباریست و توسط سیستم پر میشود'),
    startDate: Yup.string().required('تاریخ شروع به کار اجباریست')
})