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
import { API_REPAIR, API_SUB_BANK_LIST, API_USER } from '../constants'
import { useSnackbar } from 'notistack'
import { Bank } from '../components/Bank'
import { SubBank } from '../components/SubBank'
import { SubBankMngTable } from '../components/SubBankMng/SubBankMngTable'
import { useSubBankList } from '../components/SubBank/useSubBankLogic'
import { useSelector } from 'react-redux'
import { selectedBankName } from '../features/bank/bank.slice'

const OfficePage = () => {
  const { theSubBankList, isLoadingSubBank } = useSubBankList()
  const [searchLoading, setSearchLoading] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const bankOnvan = useSelector(selectedBankName)

  const createZirBank = async (values) => {
    try {
      const { jayegah, zir_onvan, sharayet } = values
      console.log({ jayegah, zir_onvan, sharayet, bankOnvan, id_bank: values.bank })
      await iaxios.post(API_SUB_BANK_LIST, { jayegah, zir_onvan, sharayet, bankOnvan, id_bank: values.bank })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
      setTimeout(() => { window.location.reload() }, 100000)
    } catch (error) {
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
  }
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
        <SectionTitleLineWithButton icon={mdiAccountBadge} title="بانکهای اطلاعاتی" main />
        <CardBox>
          <Formik
            initialValues={{
              bank: '',
              subbank: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <FormField label=''>
                  <Bank onchange={setFieldValue} />
                  <SubBank onchange={setFieldValue} />
                </FormField>
                <BaseButton type="submit" color="info" label="جستجو" />
                <BaseDivider />
                <SectionTitleLineWithButton icon={mdiMonitorEye} title="اطلاعات بانک ها" main />
              </Form>
            )}
          </Formik>
          <Formik
            initialValues={{
              bank: '',
              jayegah: 0,
              zir_onvan: '',
              sharayet: ''
            }}
            onSubmit={(values) => createZirBank(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <FormField label=''>
                  <Bank onchange={setFieldValue} />
                  <FormField label="شرایط سطح" >
                    <Field name="sharayet" placeholder="" />
                  </FormField>
                </FormField>
                <FormField label="" >
                  <FormField label="عنوان سطح" >
                    <Field name="zir_onvan" placeholder="" />
                  </FormField>
                  <FormField label="جایگاه" >
                    <Field component='select' name="jayegah" placeholder="" >
                      {Array.from({ length: 100 }, (_, i) => i + 1).map(item => <option style={{ textAlign: 'center' }} value={item}>{item}</option>)}
                    </Field>
                  </FormField>
                </FormField>
                <BaseButton type="submit" color="success" label="ایجاد" />
                <BaseDivider />
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
