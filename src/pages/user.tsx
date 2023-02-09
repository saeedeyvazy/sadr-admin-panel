import { mdiAccountBadge, mdiMonitorEye } from '@mdi/js'
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
import { API_USER } from '../constants'
import { useSnackbar } from 'notistack'
import { UserTable } from '../components/UserTable'
import { useUser } from '../hooks/useUser'
import { UserType } from '../components/UserType'
import { UserOffice } from '../components/UserOffice'
import { UserRole } from '../components/UserRole'

const OfficePage = () => {
  const { data, error, isLoading } = useUser()
  const [searchLoading, setSearchLoading] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  async function handleSubmit(values) {
    try {
      console.log(values)
      setSearchLoading(true)

      await iaxios.post(API_USER, {
        username: values.username,
        password: values.password,
        userType: values.userType,
        typeCode: values.userOffice,
        roles: values.roles.map(role => ({ id: role })),
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
        <SectionTitleLineWithButton icon={mdiAccountBadge} title="کاربران" main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              username: '',
              userType: '',
              userOffice: '',
              roles: ''
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <FormField label=' کاربری'>
                  <Field name="username" placeholder="نام کاربری" />
                  <Field name="password" placeholder="رمز عبور" type='password' />
                  <Field name="confirmPassword" placeholder="تکرار رمز عبور" type='password' />
                </FormField>
                <FormField label=''>
                  <UserType name='userType' label='نوع کاربری' />
                  <UserOffice name='userOffice' label='موسسه' />
                </FormField>
                <FormField label='نقش های کاربر'>
                  <UserRole name='roles' signal={(roleList) => setFieldValue('roles', roleList.map(role => role.value))} />
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
