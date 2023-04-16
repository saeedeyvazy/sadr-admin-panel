import { mdiAccount, mdiMail, mdiSearchWeb } from '@mdi/js'
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
import { TeacherTable } from '../components/TeacherTable'
import { useTeacher } from '../hooks/useTeacher'
import { API_SPECIFIC_TEACHER_SEARCH } from '../constants'
import { UserOffice } from '../components/UserOffice'
import { DoreSelect } from '../components/DoreSelect'

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
        <title>{getPageTitle('ClassReport')}</title>
      </Head>

      <SectionMain>

        <SectionTitleLineWithButton icon={null} title="جستجوی کلاس" main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              name: '',
              tshs: '',
              lname: '',
              onvan_dore: '',
              codemelli: '',
              codek: ''
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label="" >
                <UserOffice name='name' label='موسسه' />
                <FormField label="عنوان دوره" >
                  <DoreSelect signal={() => { }} />
                </FormField>
              </FormField>

              <FormField>
                <Field name="tshs" placeholder="سال" type={"number"} />
                <Field name="lname" placeholder="نام مربی" />
              </FormField>

              <FormField>
                <Field name="codemelli" placeholder="کد ملی" type={"number"} />
                <Field name="codek" placeholder="کد کلاس" />
              </FormField>

              <BaseButton type="submit" color="info" label="جستجو" />
              <BaseDivider />
              <BaseDivider />
              <SectionTitleLineWithButton icon={mdiSearchWeb} title="نتیجه جستجو" main />

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
