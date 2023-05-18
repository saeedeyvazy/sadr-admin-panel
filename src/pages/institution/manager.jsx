import { mdiAccount, mdiSearchWeb } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { DatePicker } from 'react-advance-jalaali-datepicker'
import BaseButton from '../../components/BaseButton'
import CardBox from '../../components/CardBox'
import FormField from '../../components/FormField'
import { Loading } from '../../components/Loading'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { ManagerCardBox } from '../../components/institution/ManagerCardBox'
import { getPageTitle, iaxios } from '../../config'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { searchByNatCode, useManager } from './hooks/useManager'
import { API_MANAGER_LIST } from '../../constants'
import { useSnackbar } from 'notistack'
import Cookies from 'universal-cookie'
import { changeManagerValidation } from '../../validation/form'
import BaseButtons from '../../components/BaseButtons'
import { useState } from 'react'

const ManagerPage = () => {
  const { response, loading } = useManager()
  const [managerData, setManagerData] = useState([])

  useEffect(() => {
    setManagerData(response)
  }, [response])
  const { enqueueSnackbar } = useSnackbar()

  async function changeManager(values) {
    try {
      const response = await iaxios.post(API_MANAGER_LIST, { code_m_kh: new Cookies().get('username'), code_p: values.nationalCode, tarikh_shoro: values.startDate })
      setManagerData([...managerData, values])
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Manager')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={null} title="مدیر عامل" main></SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={{
              nationalCode: '',
              startDate: '',
              name: ''
            }}
            onSubmit={(values) => { changeManager(values) }}
            validationSchema={changeManagerValidation}
          >
            {({ setFieldValue, errors, values }) => (
              <Form>
                <FormField label="آیتمهای جستجو" icons={[mdiAccount]} help={errors.nationalCode}>
                  <Field name="nationalCode" placeholder="کدملی" />
                  <BaseButton onClick={() => searchByNatCode(values, setFieldValue)} type='button' color='info' label='جستجو' icon={mdiSearchWeb} outline />
                </FormField>

                <FormField label=''>
                  <FormField label='نام و نام خانوادگی' help={errors.name}>
                    <Field name="name" placeholder="نام و نام خانوادگی" />
                  </FormField>
                  <FormField label="تاریخ شروع به کار" help={errors.startDate}>
                    <DatePicker
                      inputComponent={(props) => <Field name='startDate' className="popo" {...props} />}
                      placeholder="انتخاب تاریخ"
                      format="jYYYY/jMM/jDD"
                      onChange={(unix, formatted) => setFieldValue("startDate", formatted)}
                      id="datePicker"
                      preSelected=""
                    />
                  </FormField>
                </FormField>
                <BaseButtons>
                  <BaseButton disabled={errors.name || errors.nationalCode || errors.startDate} color='danger' label='تغییر مدیرعامل' outline type='submit' />
                </BaseButtons>
              </Form>
            )}
          </Formik>
        </CardBox>
        <SectionTitleLineWithButton icon={null} title="مدیران عامل" main></SectionTitleLineWithButton>
        {loading && <Loading />}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {managerData && managerData.length && managerData.map((item) => (
            <ManagerCardBox key={item.id} manager={item} />
          ))}
        </div>

      </SectionMain>
    </>
  )
}

ManagerPage.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ManagerPage
