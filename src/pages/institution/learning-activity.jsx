import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from "universal-cookie"
import BaseButton from '../../components/BaseButton'
import BaseButtons from '../../components/BaseButtons'
import BaseDivider from '../../components/BaseDivider'
import CardBox from '../../components/CardBox'
import { DoreSelect } from "../../components/DoreSelect"
import FormField from '../../components/FormField'
import { Loading } from '../../components/Loading'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { Table } from '../../components/institution/Table'
import { getPageTitle } from '../../config'
import { labels } from '../../constants/labels'
import { addActivity, deleteActivity, isLoading, memberList } from '../../features/institution/activity/activity.slice'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { learningActivityValidation } from '../../validation/form'
import { searchByNatCode, useLearnActivity } from './hooks/useLearnActivity'

const DirectorBoard = () => {
  const dispatch = useDispatch()
  useLearnActivity()
  const teacherList = useSelector(memberList)
  const loading = useSelector(isLoading)
  const [isSearchLoading, setIsSearchLoading] = useState(false)

  async function search(values, setFieldValue) {
    setIsSearchLoading(true)
    await searchByNatCode(values, setFieldValue)
    setIsSearchLoading(false)
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('LearningActivity')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={null} title={labels.learningActivity} main></SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={{
              code_dore: 0,
              codemelli_morabi: '',
              code_m_kh: ''

            }}
            validationSchema={learningActivityValidation}
          >
            {({ setFieldValue, errors, values }) => (
              <Form>
                <FormField label="" >
                  <FormField label={labels.nationalCode} help={errors.codemelli_morabi} >
                    <Field name="codemelli_morabi" type="number" component="input"></Field>
                  </FormField>
                  <FormField label={labels.officeCode} >
                    <Field name="code_m_kh" readonly value={new Cookies().get('username')} />
                  </FormField>
                </FormField>

                <FormField help={errors.code_dore}>
                  <FormField label={labels.courseTitle} >
                    <DoreSelect isMulti={false} name="code_dore" signal={(selected) => { setFieldValue('code_dore', selected.value.id) }} />
                  </FormField>
                  <FormField label=''></FormField>
                </FormField>
                <BaseButtons>
                  <BaseButton onClick={() => dispatch(addActivity(values))} disabled={errors.code_dore || errors.codemelli_morabi} color='success' label={labels.addCoach} outline type='submit' />
                </BaseButtons>
              </Form>
            )}
          </Formik>
        </CardBox>
        <BaseDivider />
        <SectionTitleLineWithButton icon={null} title={labels.trainingCourse} main></SectionTitleLineWithButton>
        <CardBox>
          {loading ? <Loading /> :
            teacherList && teacherList.length ? <Table
              rowData={teacherList.map((item, index) => ({ id: item.id, row: index + 1, fullname: `${item.fname} ${item.lname}`, nationalCode: item.codemelli_morabi, course: item.onvan_dore }))}
              rowKey={'id'} titleList={[labels.rowNum, labels.fullName, labels.nationalCode, labels.courseTitle]}
              danger={(id) => dispatch(deleteActivity(id))} /> : null}
        </CardBox>

      </SectionMain>
    </>
  )
}

DirectorBoard.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DirectorBoard
