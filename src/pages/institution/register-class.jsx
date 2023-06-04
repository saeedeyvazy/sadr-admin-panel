import BaseButtons from '@/components/BaseButtons'
import { ClassLevel } from '@/components/ClassLevel'
import { Gender } from '@/components/Gender'
import { Town } from '@/components/Town'
import { labels } from '@/constants/labels'
import { regClassLoading, registerClass } from '@/features/institution/class/register/regClass.slice'
import { addation } from '@/validation/form'
import { mdiAccount, mdiSearchWeb } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useState } from 'react'
import { DatePicker } from 'react-advance-jalaali-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import BaseButton from '../../components/BaseButton'
import BaseDivider from '../../components/BaseDivider'
import CardBox from '../../components/CardBox'
import { ClassReportTable } from '../../components/ClassReportTable'
import { DoreSelect } from '../../components/DoreSelect'
import FormField from '../../components/FormField'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { UserOffice } from '../../components/UserOffice'
import { getPageTitle, iaxios } from '../../config'
import { API_CLASS_REPORT } from '../../constants'
import { useClassReport } from '../../hooks/useClassReport'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { searchByNatCode } from './hooks/useDirectorBoard'

const FormsPage = () => {
    const { data, error, isLoading } = useClassReport()
    const [specificSearch, setSpecificSearch] = useState(false)
    const [searchResult, setSearchResult] = useState([{}])
    const [searchLoading, setSearchLoading] = useState(false)
    const [isSearchLoading, setIsSearchLoading] = useState(false)
    const addading = useSelector(regClassLoading)
    async function search(values, setFieldValue) {
        setIsSearchLoading(true)
        await searchByNatCode(values, setFieldValue)
        setIsSearchLoading(false)
    }
    async function handleSubmit(values) {
        try {
            setSearchLoading(true)
            const response = await iaxios.post(API_CLASS_REPORT, {
                codequran: values.codequran == '0' ? '' : values.codequran,
                tshs: values.tshs,
                lname: values.lname,
                onvan_dore: values.onvan_dore,
                codemelli: values.codemelli,
                codek: values.codek
            }, {
                params: {
                    page: 0,
                    size: 40
                }
            })
            setSearchLoading(false)
            setSpecificSearch(true)
            setSearchResult(response.data.data.content)
        } catch (error) {
            alert(error)
        }
    }
    const dispatch = useDispatch()
    function addClass(values) {
        const request = {
            onvan: values.onvan,
            tedadsherkatkonande: values.memberNum,
            shahrestan: values.town,
            codeteacher: values.nationalCode,
            jensiyat: values.gender,
            ttf: new Date(),
            id_hemayati: ''
        }
        dispatch(registerClass(request))
    }
    return (
        <>
            <Head>
                <title>{getPageTitle('ClassRegister')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={null} title="افزودن کلاس" main>
                </SectionTitleLineWithButton>
                <CardBox>
                    <Formik
                        initialValues={{
                            name: '',
                            nationalCode: '',
                            startDate: '',
                            memberNum: 10,
                            town: '',
                            gender: '',
                            classLevel: '',
                            onvan: ''
                        }}
                        validationSchema={addation}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ values, setFieldValue, errors }) => (
                            <Form>
                                <FormField label={labels.teacherNatCode} icons={[mdiAccount]} help={errors.nationalCode}>
                                    <Field name="nationalCode" placeholder={labels.nationalCode} />
                                    <BaseButton isLoading={isSearchLoading} onClick={() => search(values, setFieldValue)} type='button' color='info' label={labels.search} icon={mdiSearchWeb} outline />
                                </FormField>

                                <FormField label=''>
                                    <FormField label={labels.fullName} help={errors.name}>
                                        <Field name="name" placeholder={labels.fullName} />
                                    </FormField>
                                    <Gender name='gender' label={labels.gender} help={errors.gender} />
                                    <FormField help={errors.memberNum} label={labels.memberNum}>
                                        <Field name="memberNum" placeholder={labels.memberNum} />
                                    </FormField>
                                </FormField>
                                <FormField label=''>
                                    <Town help={errors.town} name='town' label={labels.town} />
                                    <ClassLevel help={errors.classLevel} name='classLevel' label={labels.classLevel} />
                                    <FormField label={labels.dore} help={errors.onvan}>
                                        <DoreSelect isMulti={false} name='onvan' signal={(selected) => setFieldValue('onvan', selected.value.id)} />
                                    </FormField>

                                </FormField>
                                <FormField label={labels.workStartDate} help={errors.startDate}>
                                    <DatePicker
                                        inputComponent={(props) => <Field name='startDate' className="popo" {...props} />}
                                        placeholder="انتخاب تاریخ"
                                        format="jYYYY/jMM/jDD"
                                        onChange={(unix, formatted) => setFieldValue("startDate", formatted)}
                                        id="datePicker"
                                        preSelected="1402/03/25"
                                        name='date'
                                    />
                                </FormField>
                                <BaseButtons>
                                    <BaseButton isLoading={addading} onClick={() => addClass(values)} disabled={errors.name || errors.nationalCode} color='success' label={labels.registerClass} outline type='button' />
                                </BaseButtons>
                            </Form>)}
                    </Formik>
                </CardBox>
            </SectionMain>

            <SectionMain>
                <SectionTitleLineWithButton icon={null} title="جستجوی کلاس" main>
                </SectionTitleLineWithButton>
                <CardBox>
                    <Formik
                        initialValues={{
                            codequran: '',
                            tshs: '',
                            lname: '',
                            onvan_dore: '',
                            codemelli: '',
                            codek: ''
                        }}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <FormField label="" >
                                    <UserOffice name='codequran' label='موسسه' />
                                    <FormField label="عنوان دوره" >
                                        <DoreSelect isMulti={true} name="onvan_dore" signal={(selected) => { setFieldValue('onvan_dore', selected[0]?.label) }} />
                                    </FormField>
                                </FormField>

                                <FormField>
                                    <Field name="tshs" placeholder="سال" type={"number"} />
                                    <Field name="lname" placeholder="نام مربی" />
                                </FormField>

                                <FormField>
                                    <Field name="codemelli" placeholder="کد ملی" type={"number"} />
                                    <Field name="codek" placeholder="کد کلاس" />
                                </FormField>

                                <BaseButton type="submit" color="info" label="جستجو" />
                                <BaseDivider />
                                <BaseDivider />
                                <SectionTitleLineWithButton icon={mdiSearchWeb} title="نتیجه جستجو" main />

                                <CardBox hasTable>
                                    {!specificSearch ? <ClassReportTable clients={data} isLoading={isLoading} error={error} />
                                        :
                                        <ClassReportTable clients={searchResult} isLoading={searchLoading} error={error} />
                                    }
                                </CardBox>

                            </Form>)}
                    </Formik>
                </CardBox>
            </SectionMain>
        </>
    )
}

FormsPage.getLayout = function getLayout(page) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
