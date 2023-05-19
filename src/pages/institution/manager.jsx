import { mdiAccount, mdiSearchWeb } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { DatePicker } from 'react-advance-jalaali-datepicker'
import Cookies from 'universal-cookie'
import BaseButton from '../../components/BaseButton'
import BaseButtons from '../../components/BaseButtons'
import CardBox from '../../components/CardBox'
import FormField from '../../components/FormField'
import { Loading } from '../../components/Loading'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { ManagerCardBox } from '../../components/institution/ManagerCardBox'
import { getPageTitle, iaxios } from '../../config'
import { API_MANAGER_LIST } from '../../constants'
import { labels } from '../../constants/labels'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { changeManagerValidation } from '../../validation/form'
import { searchByNatCode, useManager } from './hooks/useManager'
import BaseDivider from '../../components/BaseDivider'

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
      enqueueSnackbar(labels.succeed, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(labels.unsucceed, { variant: 'error' })
    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Manager')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={null} title={labels.manager} main></SectionTitleLineWithButton>
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
                <FormField label={labels.searchItem} icons={[mdiAccount]} help={errors.nationalCode}>
                  <Field name="nationalCode" placeholder={labels.nationalCode} />
                  <BaseButton onClick={() => searchByNatCode(values, setFieldValue)} type='button' color='info' label={labels.search} icon={mdiSearchWeb} outline />
                </FormField>

                <FormField label=''>
                  <FormField label={labels.fullName} help={errors.name}>
                    <Field name="name" placeholder={labels.fullName} />
                  </FormField>
                  <FormField label={labels.workStartDate} help={errors.startDate}>
                    <DatePicker
                      inputComponent={(props) => <Field name='startDate' className="popo" {...props} />}
                      placeholder={labels.date}
                      format="jYYYY/jMM/jDD"
                      onChange={(unix, formatted) => setFieldValue("startDate", formatted)}
                      id="datePicker"
                      preSelected=""
                    />
                  </FormField>
                </FormField>
                <BaseButtons>
                  <BaseButton disabled={errors.name || errors.nationalCode || errors.startDate} color='danger' label={labels.changeManager} outline type='submit' />
                </BaseButtons>
              </Form>
            )}
          </Formik>
        </CardBox>
        <BaseDivider />
        <SectionTitleLineWithButton icon={null} title={labels.lastManagers} main></SectionTitleLineWithButton>
        <CardBox>
          {loading && <Loading />}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {managerData && managerData.length && managerData.map((item) => (
              <ManagerCardBox key={item.id} manager={item} />
            ))}
          </div>
        </CardBox>
      </SectionMain>
    </>
  )
}

ManagerPage.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ManagerPage
