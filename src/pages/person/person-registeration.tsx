import { mdiBallotOutline } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import BaseButton from '../../components/BaseButton'
import BaseDivider from '../../components/BaseDivider'
import CardBox from '../../components/CardBox'
import FormField from '../../components/FormField'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../../config'
import { useTeacher } from '../../hooks/useTeacher'
import { API_ADD_PERSON, API_PERSON_REGISTRATION, API_SPECIFIC_TEACHER_SEARCH } from '../../constants'
import { useSnackbar } from 'notistack'
import { DatePicker } from 'react-advance-jalaali-datepicker'
import { Gender } from '@/components/Gender'
import { labels } from '../../constants/labels'
import Router, { useRouter } from 'next/router'

const FormsPage = () => {
  const { data, error, isLoading } = useTeacher()
  const [specificSearch, setSpecificSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([{}])
  const [searchLoading, setSearchLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState({})
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  async function handleSubmit(values) {
    try {
      setSearchLoading(true)
      const response = await iaxios.post(API_SPECIFIC_TEACHER_SEARCH, {
        firstName: values.fname,
        nationalCode: values.nationalCode
      }, {
        params: {
          page: 0,
          size: 5
        }
      })
      setSearchLoading(false)
      setSpecificSearch(true)
      setSearchResult(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const router = useRouter()
  async function handleOrganSubmit(formData) {

    try {

      const { date, password, submitPassword } = formData
      const ts = date.split("/")[0]
      const tm = date.split("/")[1]
      const tr = date.split("/")[2]

      if (password != submitPassword) {
        enqueueSnackbar('رمز عبور و تکرار رمز عبور یکسان نیستند ', { variant: 'error' })
        return
      }
      await iaxios.post(API_PERSON_REGISTRATION, { ts, tm, tr, ...formData })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
      setTimeout(() => {
        router.push('/person-login')
      }, 1000)
    } catch (error) {

      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }

  }


  return (
    <>
      <Head>
        <title>{getPageTitle('PersonRegisteration')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="ثبت نام اشخاص" main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              fname: '',
              lname: '',
              fthname: '',
              codemelli: '',
              mob: '',
              birthDate: '',
              jensiyat: '',
              password: '',
              submitPassword: ''
            }}
            onSubmit={(values) => handleOrganSubmit(values)}
          >
            {({ values, setFieldValue, errors }) => (
              <Form>
                <FormField>
                  <FormField label='نام'>
                    <Field label="" name="fname" placeholder="نام " />
                  </FormField>
                  <FormField label='نام خانوادگی'>
                    <Field label="" name="lname" placeholder="نام  خانوادگی " />
                  </FormField>
                  <FormField label='نام پدر'>
                    <Field label="" name="fthname" placeholder="نام پدر" />
                  </FormField>
                </FormField>
                <FormField label="" >
                  <Gender name='jensiyat' label={labels.gender} help={errors.jensiyat} />

                  <FormField label={labels.nationalCode} help={errors.codemelli}>
                    <Field name='codemelli' type="number" />
                  </FormField>

                  <FormField label={labels.mobile} help={errors.mob}>
                    <Field name='mob' />
                  </FormField>
                </FormField>
                <FormField>
                  <FormField label='رمز عبور' help={errors.password}>
                    <Field type='password' name='password' />
                  </FormField>

                  <FormField label='تکرار رمز عبور' help={errors.submitPassword}>
                    <Field type='password' name='submitPassword' />
                  </FormField>
                </FormField>

                <FormField>
                  <FormField label='تاریخ تولد' help={errors.birthDate}>
                    <DatePicker
                      inputComponent={(props) => <Field name='date' className="popo" {...props} />}
                      placeholder="انتخاب تاریخ"
                      format="jYYYY/jMM/jDD"
                      onChange={(unix, formatted) => setFieldValue("date", formatted)}
                      id="datePicker"
                      preSelected=""
                      name='birthDate'
                    />
                  </FormField>

                </FormField>

                <div className='grid gap-y-3 md:grid-cols-6 md:gap-x-3'>
                  <BaseButton disabled={errors.password || errors.submitPassword || errors.birthDate || errors.codemelli || errors.fname || errors.lname || errors.fthname} type="submit" color="success" label="تایید" />
                </div>
                <BaseDivider />
              </Form>)}
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default FormsPage
