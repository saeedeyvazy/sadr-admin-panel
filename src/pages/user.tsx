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
import { Organ } from '../components/Organ'
import { Town } from '../components/Town'
import { useSnackbar } from 'notistack'
import { UserTable } from '../components/UserTable'
import { useUser } from '../hooks/useUser'
import { UserType } from '../components/UserType'
import { UserOffice } from '../components/USerOffice'

const OfficePage = () => {
  const { data, error, isLoading } = useUser()
  const [searchLoading, setSearchLoading] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  async function handleSubmit(values) {
    try {
      setSearchLoading(true)
      await iaxios.post(API_ORGANIZATION_LIST, {
        id_organ: values.organ,
        shahrestan: values.town,
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
        <title>{getPageTitle('User')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="کاربران" main>
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

                </FormField>

                <FormField label=' کاربری'>
                  <Field name="username" placeholder="نام کاربری" />
                  <Field name="password" placeholder="رمز عبور" type='password' />
                  <Field name="confirmPassword" placeholder="تکرار رمز عبور" type='password' />
                </FormField>
                <FormField label=''>
                  <UserType name='userType' label='نوع کاربری' />
                  <UserOffice name='userOffice' label='موسسه' />
                </FormField>
                <BaseButton type="submit" color="success" label="ایجاد کاربر جدید" />
                <BaseDivider />
                <SectionTitleLineWithButton icon={mdiMonitorEye} title="اطلاعات کاربران" main />
                <CardBox hasTable>
                  <UserTable clients={data} isLoading={isLoading} error={error} />
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
