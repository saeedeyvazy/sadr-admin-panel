import { mdiAccount, mdiBallotOutline, mdiMail, mdiSearchWeb } from '@mdi/js'
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
import { useTeacher } from '../hooks/useTeacher'
import { API_SPECIFIC_TEACHER_SEARCH } from '../constants'
import { Organ } from '../components/Organ'
import { DoreSelect } from '../components/DoreSelect'

const FormsPage = () => {
  const { data, error, isLoading } = useTeacher()
  const [specificSearch, setSpecificSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([{}])
  const [searchLoading, setSearchLoading] = useState(false)

  async function handleSubmit(values) {
    try {
      setSearchLoading(true)
      const response = await iaxios.post(API_SPECIFIC_TEACHER_SEARCH, {
        firstName: values.fname,
        nationalCode: values.nationalCode
      }, {
        params: {
          page: 0,
          size: 5
        }
      })
      setSearchLoading(false)
      setSpecificSearch(true)
      setSearchResult(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Learning')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="دوره های معتبر تربیت معلم" main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              fname: '',
              lname: '',
              nationalCode: '',
              mobile: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField>
                <Organ />
                <FormField label='ارگان انتخاب شده'>
                  <Field label="" name="test" placeholder="نام" />
                </FormField>
              </FormField>
              <FormField>
                {/* <Field name="nationalCode" placeholder="کد ملی" /> */}
                {/* <Field name="mobile" placeholder="شماره همراه" /> */}
              </FormField>
              <div className='grid gap-y-3 md:grid-cols-6 md:gap-x-3'>
                <BaseButton type="submit" color="info" label="افزودن" />
                <BaseButton type="submit" color="warning" label="ویرایش" />
                <BaseButton type="submit" color="danger" label="حذف ارگان" />
              </div>
              <BaseDivider />
            </Form>
          </Formik>
        </CardBox>

        <SectionTitleLineWithButton icon={mdiBallotOutline} title="مدارک" main />
        <CardBox>
          <Formik
            initialValues={{
              fname: '',
              lname: '',
              nationalCode: '',
              mobile: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField>
                <Organ />
                <FormField label='مدرک انتخاب شده'>
                  <Field label="" name="test" placeholder="نوع مدرک" />
                </FormField>
              </FormField>
              <FormField>
                {/* <Field name="nationalCode" placeholder="کد ملی" /> */}
                {/* <Field name="mobile" placeholder="شماره همراه" /> */}
              </FormField>
              <div className='grid gap-y-3 md:grid-cols-6 md:gap-x-3'>
                <BaseButton type="submit" color="info" label="افزودن" />
                <BaseButton type="submit" color="warning" label="ویرایش" />
                <BaseButton type="submit" color="danger" label="حذف مدرک" />
              </div>
              <BaseDivider />
            </Form>
          </Formik>
        </CardBox>


        <SectionTitleLineWithButton icon={mdiBallotOutline} title="دوره های آموزشی معتبر" main />
        <CardBox>
          <Formik
            initialValues={{
              fname: '',
              lname: '',
              nationalCode: '',
              mobile: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField>
                <DoreSelect />
              </FormField>
              <FormField label='امضای اول'>
                <Field style={{ textAlign: 'center' }} name="" placeholder='' component="select" />
                <Field label="" name="test" placeholder="نام" />
                <Field label="" name="test" placeholder="سمت" />
              </FormField>
              <FormField label='امضای دوم'>
                <Field style={{ textAlign: 'center' }} name="" placeholder='' component="select" />
                <Field label="" name="test" placeholder="نام" />
                <Field label="" name="test" placeholder="سمت" />
              </FormField>
              <FormField label='امضای سوم'>
                <Field style={{ textAlign: 'center' }} name="" placeholder='' component="select" />
                <Field label="" name="test" placeholder="نام" />
                <Field label="" name="test" placeholder="سمت" />
              </FormField>
              <FormField label='اطلاعات دوره آموزشی'>
                <Field label="" name="test" placeholder="عنوان گواهینامه" />
                <Field label="" name="test" placeholder="گرایش" />
                <Field label="" name="test" placeholder="ساعت آموزشی" />
              </FormField>
              <div className='grid gap-y-3 md:grid-cols-6 md:gap-x-3'>
                <BaseButton type="submit" color="info" label="تایید تغییرات" />
              </div>
              <BaseDivider />
            </Form>
          </Formik>
        </CardBox>

      </SectionMain>
    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
