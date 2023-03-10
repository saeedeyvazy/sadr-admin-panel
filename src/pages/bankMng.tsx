import { mdiAccountBadge, mdiMonitorEye } from '@mdi/js'
import { Form, Formik } from 'formik'
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
import { useUser } from '../hooks/useUser'
import { Bank } from '../components/Bank'
import { SubBank } from '../components/SubBank'
import { SubBankMngTable } from '../components/SubBankMng/SubBankMngTable'
import { useSubBankList } from '../components/SubBank/useSubBankLogic'

const OfficePage = () => {
  const { theSubBankList, isLoadingSubBank } = useSubBankList()
  const [searchLoading, setSearchLoading] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  async function handleSubmit(values) {
    try {
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
        <title>{getPageTitle('BankMng')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccountBadge} title="کاربران" main />
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
                <FormField label=''>
                  <Bank onchange={setFieldValue} />
                  <SubBank onchange={setFieldValue} />
                </FormField>
                <BaseButton type="submit" color="success" label="ایجاد" />
                <BaseDivider />
                <SectionTitleLineWithButton icon={mdiMonitorEye} title="اطلاعات بانک ها" main />
              </Form>
            )}
          </Formik>
        </CardBox>
        <CardBox hasTable>
          <SubBankMngTable clients={theSubBankList} isLoading={isLoadingSubBank} error='' />
        </CardBox>
      </SectionMain>
    </>
  )
}

OfficePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default OfficePage
