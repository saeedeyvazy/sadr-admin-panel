import { FoundationReportTable } from '@/components/FoundationReportTable'
import { InstUserType } from '@/components/InstUserType'
import { labels } from '@/constants/labels'
import { mdiBallotOutline, mdiSearchWeb } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import BaseButton from '../components/BaseButton'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import FormField from '../components/FormField'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../config'
import { API_FOUNDATION_LIST } from '../constants'
import { useClassReport } from '../hooks/useClassReport'
import LayoutAuthenticated from '../layouts/Authenticated'
import { addFoundationValidation } from '@/validation/form'
import { useSnackbar } from 'notistack'

const FormsPage = () => {
  const { data, error, isLoading } = useClassReport()
  const [specificSearch, setSpecificSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([{}])
  const [searchLoading, setSearchLoading] = useState(false)

  async function handleSubmit(values) {
    try {
      setSearchLoading(true)
      const response = await iaxios.get(API_FOUNDATION_LIST, {
        params: {
          page: 0,
          size: 40,
          mkh: values.userType
        }
      })
      setSearchLoading(false)
      setSpecificSearch(true)
      setSearchResult(response.data.data.content)
    } catch (error) {
      alert(error)
    }
  }
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  async function addFoundation(values) {
    try {
      await iaxios.post(API_FOUNDATION_LIST, { values })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      console.log(error.response.data.message)
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Foundation')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title={labels.addFoundation} main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              mkh: '',
              code: '',
              name: '',
              shs: ''
            }}
            validationSchema={addFoundationValidation}
            onSubmit={(values) => { addFoundation(values) }}
          >
            {({ errors }) => (
              <Form>
                <FormField label=''>
                  <InstUserType name='mkh' label='نوع کاربری' help={errors.mkh} />
                  <FormField label='شناسه ملی' help={errors.code}>
                    <Field name='code' label='' />
                  </FormField>
                </FormField>
                <FormField label=''>
                  <FormField label='شماره ثبت' help={errors.shs}>
                    <Field name='shs' label='' />
                  </FormField>
                  <FormField label='نام کامل' help={errors.name}>
                    <Field name='name' label='' />
                  </FormField>
                </FormField>

                <div className='grid gap-y-3 md:grid-cols-6 md:gap-x-3'>
                  <BaseButton type="submit" color="info" label="افزودن" disabled={errors.name || errors.shs || errors.code || errors.mkh} />
                </div>
                <BaseDivider />
              </Form>)}
          </Formik>
        </CardBox>

        <SectionTitleLineWithButton icon={null} title={labels.search} main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              userType: ''
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue, errors }) => (
              <Form>
                <FormField label=''>
                  <InstUserType name='userType' label='نوع کاربری' help={errors.userType} />
                </FormField>

                <BaseButton type="submit" color="info" label="جستجو" />
                <BaseDivider />
                <SectionTitleLineWithButton icon={mdiSearchWeb} title="نتیجه جستجو" main />

                <CardBox hasTable>
                  {!specificSearch ? <FoundationReportTable clients={data} isLoading={isLoading} error={error} />
                    :
                    <FoundationReportTable clients={searchResult} isLoading={searchLoading} error={error} />
                  }
                </CardBox>

              </Form>)}
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
