/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import BaseButton from '@/components/BaseButton'
import BaseDivider from '@/components/BaseDivider'
import { Loading } from '@/components/Loading'
import { API_OFFICE_INFO, API_UPDATE_OFFICE, API_UPLOAD_PIC } from '@/constants'
import { addPersonValidation } from '@/validation/form'
import FormField from '@component/FormField'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import CardBox from '../../components/CardBox'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../../config'
import { labels } from '../../constants/labels'
import LayoutAuthenticated from '../../layouts/Authenticated'

const OfficeInfo = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [officeInfo, setOfficeInfo] = useState({})
  const [type, setType] = useState(undefined)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [isLoadingSubmitForm, setIsLoadingSubmitForm] = useState(false)

  const [file, setFile] = useState(undefined)

  async function fetchOfficeInfo() {
    try {
      setIsPageLoading(true)
      const response = await iaxios.get(`${API_OFFICE_INFO}/${new Cookies().get('username')}`)

      setOfficeInfo(response.data.data)
      setIsPageLoading(false)
      enqueueSnackbar(labels.succeed, { variant: 'success' })
    } catch (error) {
      setIsPageLoading(false)
      enqueueSnackbar(labels.unsucceed, { variant: 'error' })
      console.log(error)
    }
  }
  useEffect(() => {
    fetchOfficeInfo()
  }, [])


  async function handleSubmit(values) {
    try {
      setIsLoadingSubmitForm(true)
      await iaxios.put(API_UPDATE_OFFICE, values)
      setIsLoadingSubmitForm(false)
      enqueueSnackbar(labels.succeed, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(labels.unsucceed, { variant: 'error' })
      setIsLoadingSubmitForm(false)
      console.log(error)
    }
  }

  async function handleUploadClick() {
    try {
      setIsUploadLoading(true)
      var bodyFormData = new FormData()
      bodyFormData.append('file', file)
      bodyFormData.append('type', type)
      bodyFormData.append('code', new Cookies().get('username'))

      await iaxios.post(API_UPLOAD_PIC, bodyFormData, { headers: { "Content-Type": "multipart/form-data" } })
      enqueueSnackbar(labels.succeed, { variant: 'success' })
      setIsUploadLoading(false)
      setTimeout(() => window.location.reload(), 2000)
    } catch (error) {
      enqueueSnackbar(labels.unsucceed, { variant: 'error' })
      setIsUploadLoading(false)
      alert(error)
    }
  }
  return (
    <>

      <Head>
        <title>{getPageTitle('OfficeInfo')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={null} title={labels.officeInfo} main></SectionTitleLineWithButton>
        {isPageLoading && <Loading />}
        {!isPageLoading &&
          <CardBox>
            <Formik
              enableReinitialize={true}
              initialValues={officeInfo}
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
                  <BaseDivider />
                  <SectionTitleLineWithButton icon={null} title='تصاویر مربوطه' main></SectionTitleLineWithButton>
                  <BaseDivider />
                  <div className='grid grid-cols-5 w-full'>
                    <div className="grid grid-cols-1 text-center gap-y-4">
                      <span className='font-bold'>آرم موسسه</span>
                      <img
                        alt="test"
                        src={`data:image/png;base64,${values.logo}`}
                        className="rounded-sm shadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
                      />
                    </div>
                    <div className="grid grid-cols-1 text-center gap-y-4">
                      <span className='font-bold'>روزنامه رسمی</span>
                      <img
                        src={`data:image/png;base64,${values.rozname_rasmi}`}
                        className="rounded-smshadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
                      />
                    </div>
                    <div className="grid grid-cols-1 text-center gap-y-4">
                      <span className='font-bold'>روزنامه محلی</span>
                      <img
                        src={`data:image/png;base64,${values.rozname_mahali}`}
                        className="rounded-smshadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
                      />
                    </div>
                    <div className="grid grid-cols-1 text-center gap-y-4">
                      <span className='font-bold'>آگهی تاسیس</span>
                      <img
                        src={`data:image/png;base64,${values.agahi_tasis}`}
                        className="rounded-smshadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
                      />
                    </div>
                    <div className="grid grid-cols-1 text-center gap-y-4">
                      <span className='font-bold'>پروانه فعالیت</span>
                      <img
                        src={`data:image/png;base64,${values.parvane_faaliat}`}
                        className="rounded-smshadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
                      />
                    </div>
                  </div>
                  <BaseButton isLoading={isLoadingSubmitForm} color='info' type='button' onClick={() => handleSubmit(values)} label={labels.confirm} />
                </Form >)
              }
            </Formik >
            <Formik initialValues={officeInfo}
              validationSchema={addPersonValidation}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, errors }) => (
                <Form>
                  <CardBox>
                    <SectionTitleLineWithButton icon={null} title='آپلود تصاویر' ></SectionTitleLineWithButton>
                    <FormField>
                      <Field name='file' style={{ textAlign: 'center' }} value={type} onChange={(e) => setType(e.target.value)} component="select">
                        <option value='0'>هیچکدام</option>
                        <option value='1'>آرم موسسه</option>
                        <option value='2'>روزنامه رسمی</option>
                        <option value='3'>روزنامه محلی</option>
                        <option value='4'>آگهی تاسیس</option>
                        <option value='5'>پروانه فعالیت</option>
                      </Field>
                    </FormField>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <div>{file && `${file.name} - ${file.type}`}</div>
                    <BaseButton disabled={file == undefined || type == undefined} isLoading={isUploadLoading} color='info' label={labels.upload} type='button' onClick={handleUploadClick} />
                  </CardBox>
                </Form>
              )}
            </Formik>
          </CardBox>
        }
      </SectionMain>
    </>
  )
}

OfficeInfo.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default OfficeInfo
