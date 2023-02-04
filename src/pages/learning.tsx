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
import { Position } from '../components/Position'

const FormsPage = () => {
  const { data, error, isLoading } = useTeacher()
  const [specificSearch, setSpecificSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([{}])
  const [searchLoading, setSearchLoading] = useState(false)
  const [e1Onvan, setE1Onvan] = useState("")
  const [selectedOption, setSelectedOption] = useState({})
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
              <FormField label='نام دوره'>
                <DoreSelect signal={(selected) => setSelectedOption(selected.value)} />
              </FormField>
              <FormField label='امضای اول'>
                <Position name='pos1' />
                <Field label="" name="e1_onvan" placeholder="نام" value={selectedOption?.e1_onvan} />
                <Field label="" name="e1_semat" placeholder="سمت" value={selectedOption?.e1_semat} />
              </FormField>
              <FormField label='امضای دوم'>
                <Position name='pos2' />
                <Field label="" name="test" placeholder="نام" value={selectedOption?.e2_onvan} />
                <Field label="" name="test" placeholder="سمت" value={selectedOption?.e2_semat} />
              </FormField>
              <FormField label='امضای سوم'>
                <Position name='pos3' />
                <Field label="" name="test" placeholder="نام" value={selectedOption?.e3_onvan} />
                <Field label="" name="test" placeholder="سمت" value={selectedOption?.e3_semat} />
              </FormField>
              <FormField label='اطلاعات دوره آموزشی'>
                <Field label="" name="test" placeholder="عنوان گواهینامه" value={selectedOption?.onvan_govahi} />
                <Field label="" name="test" placeholder="گرایش" value={selectedOption?.gerayesh} />
                <Field label="" name="test" placeholder="ساعت آموزشی" value={selectedOption?.saat} />
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
