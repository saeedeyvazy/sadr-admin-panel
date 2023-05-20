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
import { ActivityCardBox } from '../../components/institution/ActivityCardBox'
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
              code_dore: '',
              codemelli_morabi: '',
              code_m_kh: ''

            }}
            onSubmit={(values) => { dispatch(addActivity(values)) }}
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
                    <DoreSelect isMulti={false} name="t" signal={(selected) => { setFieldValue('code_dore', selected.value.id) }} />
                  </FormField>
                  <FormField label=''></FormField>
                </FormField>
                <BaseButtons>
                  <BaseButton disabled={errors.code_dore || errors.codemelli_morabi} color='success' label={labels.addCoach} outline type='submit' />
                </BaseButtons>
              </Form>
            )}
          </Formik>
        </CardBox>
        <BaseDivider />
        <SectionTitleLineWithButton icon={null} title={labels.trainingCourse} main></SectionTitleLineWithButton>
        <CardBox>
          {loading && <Loading />}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {teacherList && teacherList.map((item) => (
              <ActivityCardBox
                key={item.id}
                title={`${item.fname} ${item.lname}`}
                subtitle={`${labels.nationalCode} ${item.codemelli_morabi}`}
                pillDesc={item.onvan_dore}
                deleteItem={() => dispatch(deleteActivity(item.id))} />
            ))}
          </div>
        </CardBox>
      </SectionMain>
    </>
  )
}

DirectorBoard.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DirectorBoard
