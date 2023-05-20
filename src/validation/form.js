import * as Yup from 'yup'
import { labels } from '../constants/labels'

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


export const directorBoardValidation = Yup.object().shape({
    nationalCode: Yup.string().required('کد ملی جباریست'),
    name: Yup.string().required('نام اجباریست و توسط سیستم پر میشود'),
})

export const learningActivityValidation = Yup.object().shape({
    codemelli_morabi: Yup.string().required(labels.validation.mandatory),
    code_dore: Yup.string().required(labels.validation.mandatory),
    code_m_kh: Yup.string().required(labels.validation.mandatory),
})