import BaseButton from '@/components/BaseButton'
import { Gender } from '@/components/Gender'
import { API_ADD_PERSON, API_OFFICE_INFO } from '@/constants'
import { addPersonValidation } from '@/validation/form'
import FormField from '@component/FormField'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import CardBox from '../../components/CardBox'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../../config'
import { labels } from '../../constants/labels'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { DatePicker } from 'react-advance-jalaali-datepicker'
import Cookies from 'universal-cookie'
import { useEffect, useState } from 'react'
import BaseDivider from '@/components/BaseDivider'

const OfficeInfo = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [officeInfo, setOfficeInfo] = useState({})
  async function fetchOfficeInfo() {
    try {

      const response = await iaxios.get(`${API_OFFICE_INFO}/${new Cookies().get('username')}`)
      console.log(response.data.data.code)
      setOfficeInfo(response.data.data)
      enqueueSnackbar(labels.succeed, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(labels.unsucceed, { variant: 'error' })
      console.log(error)
    }
  }
  useEffect(() => {
    fetchOfficeInfo()
  }, [])


  async function handleSubmit(values) {
    try {

      await iaxios.post(API_ADD_PERSON)

      enqueueSnackbar(labels.succeed, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(labels.unsucceed, { variant: 'error' })
      console.log(error)
    }
  }
  return (
    <>

      <Head>
        <title>{getPageTitle('OfficeInfo')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={null} title={labels.officeInfo} main></SectionTitleLineWithButton>
        <CardBox>
          <Formik
            // values={officeInfo}
            enableReinitialize={true}
            initialValues={officeInfo}
            // code: officeInfo.code,
            // shs: '',
            // sh_p: '',
            // nam: '',
            // onvan: '',
            // tell: '',
            // fax: '',
            // ostan: '',
            // shahrestan: '',
            // bakhsh: '',
            // dahestan: '',
            // shahr: '',
            // abadi: '',
            // daqiq: '',
            // codeposti: '',
            // ttm: '',
            // ttr: '',
            // tts: '',
            // name_organ: '',
            // shhesab: '',
            // name_bank: '',
            // shaba: '',
            // email: '',
            // web: '',
            // social_onvan: '',
            // social_address: '',
            // noo: '',

            validationSchema={addPersonValidation}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors }) => (
              <Form>
                <FormField label="" >
                  <FormField label={labels.fname}>
                    <Field name='code' disabled />
                  </FormField>
                  <FormField label={labels.regCode} help={errors.shs}>
                    <Field name='shs' />
                  </FormField>
                  <FormField label={labels.shp} help={errors.sh_p}>
                    <Field name='sh_p' disabled />
                  </FormField>
                </FormField>

                <FormField label="" >
                  <FormField label={labels.officeName} help={errors.nam}>
                    <Field name='nam' />
                  </FormField>
                  <FormField label={labels.tell} help={errors.tell}>
                    <Field name='tell' />
                  </FormField>
                  <FormField label={labels.fax} help={errors.fax}>
                    <Field name='fax' />
                  </FormField>
                </FormField>
                <FormField label="" >
                  <FormField label={labels.officeType} help={errors.onvan}>
                    <Field name='onvan' />
                  </FormField>
                  <FormField label={labels.province} help={errors.ostan}>
                    <Field name='ostan' disabled />
                  </FormField>
                  <FormField label={labels.town} help={errors.shahrestan}>
                    <Field name='shahrestan' disabled />
                  </FormField>
                </FormField>
                <FormField label="" >
                  <FormField label={labels.city} help={errors.onvan}>
                    <Field name='shahr' disabled />
                  </FormField>
                  <FormField label={labels.postalCode} help={errors.ostan}>
                    <Field name='codeposti' />
                  </FormField>
                  <FormField label={labels.town} help={errors.shahrestan}>
                    <Field name='shahrestan' disabled />
                  </FormField>
                </FormField>
                <FormField label="" >
                  <FormField label={labels.day} help={errors.onvan}>
                    <Field name='ttr' />
                  </FormField>
                  <FormField label={labels.month} help={errors.ostan}>
                    <Field name='ttm' />
                  </FormField>
                  <FormField label={labels.year} help={errors.shahrestan}>
                    <Field name='tts' />
                  </FormField>
                </FormField>
                <FormField label={labels.address}>
                  <Field name='daqiq' />
                </FormField>
                <FormField>
                  <FormField label={labels.bank}>
                    <Field name='name_bank'></Field>
                  </FormField>
                  <FormField label={labels.account}>
                    <Field name='shhesab'></Field>
                  </FormField>
                  <FormField label={labels.iban}>
                    <Field name='shaba'></Field>
                  </FormField>
                </FormField>
                <FormField>
                  <FormField label={labels.email}>
                    <Field name='email'></Field>
                  </FormField>
                  <FormField label={labels.web}>
                    <Field name='web'></Field>
                  </FormField>
                  <FormField label={labels.socialAddress}>
                    <Field name='social_address'></Field>
                  </FormField>
                </FormField>
                <SectionTitleLineWithButton icon={null} title='تصاویر موبوطه' main></SectionTitleLineWithButton>
                <BaseDivider />
                <div className='grid grid-cols-5 w-full'>
                  <img
                    src={`data:image/png;base64,${values.logo}`}
                    className="rounded-sm shadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
                  />
                  <img
                    src={`data:image/png;base64,${values.rozname_rasmi}`}
                    className="rounded-smshadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
                  />
                  <img
                    src={`data:image/png;base64,${values.rozname_mahali}`}
                    className="rounded-smshadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
                  />
                  <img
                    src={`data:image/png;base64,${values.agahi_tasis}`}
                    className="rounded-smshadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
                  />
                  <img
                    src={`data:image/png;base64,${values.parvane_faaliat}`}
                    className="rounded-smshadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
                  />
                </div>

                <BaseButton disabled={errors.fname || errors.lname || errors.fthname || errors.codemelli || errors.mob} color='info' type='submit' label={labels.confirm} />

              </Form >)
            }
          </Formik >
        </CardBox>
      </SectionMain>
    </>
  )
}

OfficeInfo.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default OfficeInfo
