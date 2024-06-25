/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import BaseButton from '@/components/BaseButton'
import BaseDivider from '@/components/BaseDivider'
import { Loading } from '@/components/Loading'
import { API_ADD_PERSON, API_OFFICE_INFO, API_SEARCH_MANAGER, API_UPDATE_OFFICE, API_UPLOAD_PERSON_NAT_CARD, API_UPLOAD_PIC } from '@/constants'
import { addPersonValidation } from '@/validation/form'
import FormField from '@component/FormField'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import CardBox from '../components/CardBox'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../config'
import { labels } from '../constants/labels'
import LayoutAuthenticated from '../layouts/Authenticated'
import { Gender } from '@/components/Gender'

const PersonInfo = () => {
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
      const response = await iaxios.post(`${API_SEARCH_MANAGER}`, { nationalCode: new Cookies().get('username') })

      setOfficeInfo(response.data.data?.[0])
      console.log(response.data.data?.[0])
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
      await iaxios.put(API_ADD_PERSON, values)
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

      await iaxios.post(API_UPLOAD_PERSON_NAT_CARD, bodyFormData, { headers: { "Content-Type": "multipart/form-data" } })
      enqueueSnackbar(labels.succeed, { variant: 'success' })
      setIsUploadLoading(false)
      setTimeout(() => window.location.reload(), 1200)
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
                      <Field name='fname' />
                    </FormField>
                    <FormField label={labels.lname} help={errors.lname}>
                      <Field name='lname' />
                    </FormField>
                    <FormField label={labels.fthname} help={errors.fthname}>
                      <Field name='fthname' />
                    </FormField>
                  </FormField>

                  <FormField label="" >
                    <FormField label={labels.nationalCode} help={errors.nationalCode}>
                      <Field name='codemelli' />
                    </FormField>
                    <FormField label='محل صدور' help={errors.mahalsodor}>
                      <Field name='mahalsodor' />
                    </FormField>
                    <FormField label='مذهب' help={errors.mazhabName}>
                      <Field name='mazhabName' />
                    </FormField>
                  </FormField>
                  <FormField label="" >
                    <FormField label='وضعیت تاهل' help={errors.taholName}>
                      <Field name='taholName' />
                    </FormField>
                    <FormField label='وضعین نظام وظیفه' help={errors.vaziyatnezamName}>
                      <Field name='vaziyatnezamName' />
                    </FormField>
                    <FormField label='محل سکونت' help={errors.shahr_sokonat}>
                      <Field name='shahr_sokonat' />
                    </FormField>
                  </FormField>
                  <FormField label="" >
                    <FormField label='شماره شناسنامه' help={errors.shsh}>
                      <Field name='shsh' />
                    </FormField>
                    <FormField label='وضعیت جسمانی' help={errors.vjesmaniName}>
                      <Field name='vjesmaniName' />
                    </FormField>
                    <FormField label='نوع تحصیلات' help={errors.notahsilat}>
                      <Field name='notahsilat' />
                    </FormField>
                  </FormField>

                  <FormField>
                    <FormField label={labels.mobile}>
                      <Field name='mob'></Field>
                    </FormField>
                    <FormField label={labels.tell}>
                      <Field name='tell'></Field>
                    </FormField>
                    <Gender name='jensiyat' label={labels.gender} help={errors.jensiyat} />
                  </FormField>

                  <FormField label="" >
                    <FormField label='تابعیت' help={errors.tabiyatfeli}>
                      <Field name='tabiyatfeli' />
                    </FormField>
                    <FormField label='سطح تحصیلات' help={errors.tahsilatclassic}>
                      <Field name='tahsilatclassic' />
                    </FormField>
                  </FormField>
                  <BaseDivider />

                  <BaseButton isLoading={isLoadingSubmitForm} color='info' type='button' onClick={() => handleSubmit(values)} label={labels.confirm} />
                </Form >)
              }
            </Formik >

            <Formik initialValues={officeInfo}
              validationSchema={addPersonValidation}
            // onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, errors }) => (
                <Form>
                  <div className="grid grid-cols-4">
                    <CardBox className='grid grid-cols-1'>
                      <div className="flex flex-col grid-cols-1 gap-y-4 text-center h-full">
                        <img
                          src={`data:image/png;base64,${values.tkmelli}`}
                          className="rounded-smshadow-lg block  w-full bg-gray-100 h-full dark:bg-slate-800"
                        />
                        <span className='font-bold'>تصویر کارت ملی</span>
                      </div>
                    </CardBox>
                    <CardBox className='grid grid-cols-1'>
                      <div className="grid grid-cols-1 text-center gap-y-4 h-full">
                        <img
                          src={`data:image/png;base64,${values.ttmoalem}`}
                          className="rounded-smshadow-lg block  w-full bg-gray-100 h-full dark:bg-slate-800"
                        />
                        <span className='font-bold'>تصویر شناسنامه</span>
                      </div>
                    </CardBox>
                  </div>
                </Form>)}
            </Formik>

            <Formik initialValues={officeInfo}
              validationSchema={addPersonValidation}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, errors }) => (
                <Form>
                  <CardBox>
                    <SectionTitleLineWithButton icon={null} title='آپلود تصویر کارت ملی' ></SectionTitleLineWithButton>
                    <div className='flex items-center justify-between'>
                      <div className='flex flex-col justify-between space-y-1'>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                        <div>{file && `${file.name} - ${file.type}`}</div>
                        <BaseButton disabled={file == undefined} isLoading={isUploadLoading} color='info' label={labels.upload} type='button' onClick={handleUploadClick} />
                      </div>

                    </div>
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

PersonInfo.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default PersonInfo
