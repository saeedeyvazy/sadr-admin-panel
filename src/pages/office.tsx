import { mdiAccount, mdiBallotOutline, mdiMail, mdiMonitorEye, mdiSearchWeb } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import BaseButton from '../components/BaseButton'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import FormField from '../components/FormField'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../config'
import { API_ORGANIZATION_LIST } from '../constants'
import { OrganizationTable } from '../components/OrganizationTable'
import { useOrgan } from '../hooks/useOrgan'
import { Organ } from '../components/Organ'
import { Town } from '../components/Town'
import { useSnackbar } from 'notistack'

const OfficePage = () => {
  const { data, error, isLoading } = useOrgan()
  const [searchLoading, setSearchLoading] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  async function handleSubmit(values) {
    try {
      setSearchLoading(true)
      await iaxios.post(API_ORGANIZATION_LIST, {
        id_organ: values.organ,
        shahrestan: values.shahrestan,
        onvan_raiis: values.bossTitle,
        name_raiis: values.bossName,
        onvan_karshenas: values.onvan_karshenas,
        name_karshenas: values.name_karshenas
      })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
      console.log(error)
    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Office')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="ادارات شهرستان" main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              town: '',
              organ: '',
              bossTitle: '',
              bossName: '',
              onvan_karshenas: '',
              name_karshenas: ''
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <FormField>
                  <Organ setFieldValue={setFieldValue} />
                  <Town name='town' label='شهرستان' />
                </FormField>

                <FormField label='رییس اداره شهرستان'>
                  <Field name="bossTitle" placeholder="عنوان سمت" />
                  <Field name="bossName" placeholder="نام و نام خانوادگی" />
                </FormField>
                <FormField label='کارشناس قرآن شهرستان'>
                  <Field name="onvan_karshenas" placeholder="عنوان سمت" />
                  <Field name="name_karshenas" placeholder="نام و نام خانوادگی" />
                </FormField>
                <BaseButton type="submit" color="success" label="ایجاد" />
                <BaseDivider />

                <SectionTitleLineWithButton icon={mdiMonitorEye} title="اطلاعات ادارات شهرستانی" main />

                <CardBox hasTable>
                  <OrganizationTable clients={data} isLoading={isLoading} error={error} />
                </CardBox>
              </Form>
            )}
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

OfficePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default OfficePage
