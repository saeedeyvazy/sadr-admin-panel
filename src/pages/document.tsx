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
import { DocumentTable } from '../components/DocumentTable'
import { useTeacher } from '../hooks/useTeacher'
import { API_SPECIFIC_TEACHER_SEARCH } from '../constants'
import { DocStatus } from '../components/DocStatus/index'

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
    } catch (error) {

    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Document')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="جستجوی مدارک" main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              fname: '',
              lname: '',
              nationalCode: '',
              status: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <DocStatus onChange={setFieldValue} />
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

                <SectionTitleLineWithButton icon={mdiSearchWeb} title="نتیجه جستجو" main />

                {/* <CardBox hasTable>
                {!specificSearch ? <DocumentTable clients={data} isLoading={isLoading} error={error} />
                  :
                  <DocumentTable clients={searchResult} isLoading={searchLoading} error={error} />
                }
              </CardBox> */}
              </Form>)}
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
