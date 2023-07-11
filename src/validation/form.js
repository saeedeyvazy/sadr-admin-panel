import * as Yup from 'yup'
import { labels } from '../constants/labels'

export const instLoginFormValidation = Yup.object().shape({
    userType: Yup.string().required('نوع کاربری را انتخاب کنید'),
    username: Yup.string().required('نام کاربری خود را وارد کنید'),
    password: Yup.string().required('رمز عبور خود را وارد کنید')
})

export const changeManagerValidation = Yup.object().shape({
    nationalCode: Yup.string().required(labels.validation.mandatory),
    name: Yup.string().required('نام اجباریست و توسط سیستم پر میشود'),
    startDate: Yup.string().required(labels.validation.mandatory)
})


export const directorBoardValidation = Yup.object().shape({
    nationalCode: Yup.string().required(labels.validation.mandatory),
    name: Yup.string().required('نام اجباریست و توسط سیستم پر میشود'),
})

export const learningActivityValidation = Yup.object().shape({
    codemelli_morabi: Yup.string().max(10).min(10).required(labels.validation.mandatory),
    code_dore: Yup.string().required(labels.validation.mandatory),
    code_m_kh: Yup.string().required(labels.validation.mandatory),
})

export const changePassValidation = Yup.object().shape({
    new: Yup.string().required(labels.validation.mandatory),
    current: Yup.string().required(labels.validation.mandatory),
})

export const assosiationValidation = Yup.object().shape({
    onvan_anjoman: Yup.string().required(labels.validation.mandatory),
    onvan_anjoman_edit: Yup.string().required(labels.validation.mandatory_for_edit),
    address_group: Yup.string().required(labels.validation.mandatory),
    address_group_b: Yup.string().required(labels.validation.mandatory),
    address_group_kh: Yup.string().required(labels.validation.mandatory),
})

export const assosiationStatusValidation = Yup.object().shape({
    status: Yup.string().required(labels.validation.mandatory),
    id_anjoman: Yup.string().required(labels.validation.mandatory),

})

export const addFoundationValidation = Yup.object().shape({
    shs: Yup.string().required(labels.validation.mandatory),
    code: Yup.string().required(labels.validation.mandatory),
    name: Yup.string().required(labels.validation.mandatory),
    mkh: Yup.string().required(labels.validation.mandatory),
})

export const addPersonValidation = Yup.object().shape({
    fname: Yup.string().required(labels.validation.mandatory),
    lname: Yup.string().required(labels.validation.mandatory),
    fthname: Yup.string().required(labels.validation.mandatory),
    date: Yup.string().required(labels.validation.mandatory),
    codemelli: Yup.string().required(labels.validation.mandatory),
    mob: Yup.string().required(labels.validation.mandatory),
    jensiyat: Yup.string().required(labels.validation.mandatory),
})

export const registerClassValidation = Yup.object().shape({
    nationalCode: Yup.string().required(labels.validation.mandatory),
    name: Yup.string().required('نام اجباریست و توسط سیستم پر میشود'),
    memberNum: Yup.string().required(labels.validation.mandatory),
    startDate: Yup.string().required(labels.validation.mandatory),
    gender: Yup.string().required(labels.validation.mandatory),
    classLevel: Yup.string().required(labels.validation.mandatory),
    town: Yup.string().required(labels.validation.mandatory),
})