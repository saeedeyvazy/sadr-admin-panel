import CardBoxModal from '@/components/CardBoxModal'
import { isLoading, list, updateInsurance } from '@/features/institution/insurance/insurance.slice'
import FormField from '@component/FormField'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BaseButtons from '../../components/BaseButtons'
import BaseDivider from '../../components/BaseDivider'
import CardBox from '../../components/CardBox'
import { Loading } from '../../components/Loading'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { Table } from '../../components/institution/Table'
import { getPageTitle } from '../../config'
import { labels } from '../../constants/labels'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { learningActivityValidation } from '../../validation/form'
import { useInsurance } from './hooks/useInsurance'

const Insurance = () => {
  const dispatch = useDispatch()
  useInsurance()
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const teacherList = useSelector(list)
  const loading = useSelector(isLoading)
  const updateModalRef = useRef()
  const [code, setCode] = useState('')

  function handleUpdate(code) {
    setIsModalInfoActive(true)
    setCode(code)
  }
  function handleModalAction() {
    updateModalRef.current.handleSubmit()
    setIsModalInfoActive(false)
  }
  function handleSubmit(values) {
    dispatch(updateInsurance({ code, ...values }))
  }
  return (
    <>
      <CardBoxModal
        title={labels.update}
        buttonColor="info"
        buttonLabel={labels.confirm}
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={() => setIsModalInfoActive(false)}
      >
        <Formik
          initialValues={{
            startClassHour: '',
            startClassMinute: '',
            endClassHour: '',
            endClassMinute: ''
          }}
          onSubmit={handleSubmit}
          innerRef={updateModalRef}
        >
          {({ values, setFieldValue }) => (
            <Form className="md:min-w-[300px] md:min-h-[300px]" >
              <FormField label='آیا سابقه فعالیت انتخابی را تایید میکنید؟'>
                <Field style={{ textAlign: 'center' }} name={name} id={name} component="select">
                  <option value='1'>بله</option>
                  <option value='2'>خیر</option>
                </Field>
              </FormField>
              <FormField label='آیا عنوان ثبت شده مورد تأیید شما می باشد؟'>
                <Field style={{ textAlign: 'center' }} name={name} id={name} component="select">
                  <option value='1'>بله</option>
                  <option value='2'>خیر</option>
                </Field>
              </FormField>
              <FormField label='آیا فرد مورد نظر هم اکنون با شما همکاری دارد؟'>
                <Field style={{ textAlign: 'center' }} name={name} id={name} component="select">
                  <option value='1'>بله</option>
                  <option value='2'>خیر</option>
                </Field>
              </FormField>

              <FormField label="" >
                <FormField label={labels.startClassHour} >
                  <Field name='startClassHour' type="number" />
                </FormField>
                <FormField label={labels.startClassMinute}>
                  <Field name='startClassMinute' type="number" />
                </FormField>
              </FormField>
              <FormField label="" >
                <FormField label={labels.endClassHour} >
                  <Field name='endClassHour' type="number" />
                </FormField>
                <FormField label={labels.endClassMinute}>
                  <Field name='endClassMinute' type="number" />
                </FormField>
              </FormField>
            </Form >)
          }
        </Formik >
      </CardBoxModal >
      <Head>
        <title>{getPageTitle('Insurance')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={null} title={labels.insurance} main></SectionTitleLineWithButton>
        <CardBox>
          {loading ? <Loading /> :
            teacherList && teacherList.length ? <Table
              rowData={teacherList.map((item, index) => ({
                id: item.code, row: index + 1, fullname: `${item.fname} ${item.lname}`, mobile: item.mob, course: item.doretadris,
                startWorkDate: item.tahamkari,
                endWorkDate: item.tphamkari
              }))}
              rowKey={'id'} titleList={[labels.rowNum, labels.fullName, labels.mobile, labels.courseTitle, labels.startCoWorkDate,
              labels.endCoWorkDate]}
              info={(code) => { handleUpdate(code) }}
            /> : null}
        </CardBox>

      </SectionMain>
    </>
  )
}

Insurance.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Insurance
