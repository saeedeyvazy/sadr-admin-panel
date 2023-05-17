import { mdiAccount, mdiMail, mdiSearchWeb } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import BaseButton from '../components/BaseButton'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import FormField from '../components/FormField'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { TeacherTable } from '../components/TeacherTable'
import { getPageTitle, iaxios } from '../config'
import { API_SPECIFIC_TEACHER_SEARCH } from '../constants'
import { useTeacher } from '../hooks/useTeacher'
import LayoutAuthenticated from '../layouts/Authenticated'

const FormsPage = () => {
  const { data, error, isLoading, totalTeacherLength } = useTeacher()
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
    } catch (error) {

    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Forms')}</title>
      </Head>

      <SectionMain>

        <SectionTitleLineWithButton icon={null} title="جستجوی افراد" main>
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
              <FormField label="آیتمهای جستجو" icons={[mdiAccount, mdiMail]}>
                <Field name="fname" placeholder="نام" />
                <Field name="lname" placeholder="نام خانوادگی" />
              </FormField>
              <FormField>
                <Field name="nationalCode" placeholder="کد ملی" />
                <Field name="mobile" placeholder="شماره همراه" />
              </FormField>
              <BaseButton type="submit" color="info" label="جستجو" />
              <BaseDivider />
              <BaseDivider />
              <div className='flex items-center justify-between'>
                <SectionTitleLineWithButton icon={mdiSearchWeb} title="نتیجه جستجو" main />
                <SectionTitleLineWithButton icon={null} title={`تعداد کل ${totalTeacherLength} نفر`} />
              </div>

              <CardBox hasTable>
                {!specificSearch ? <TeacherTable clients={data} isLoading={isLoading} error={error} />
                  :
                  <TeacherTable clients={searchResult} isLoading={searchLoading} error={error} />
                }
              </CardBox>

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
