import { mdiSearchWeb } from '@mdi/js'
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
import { ClassReportTable } from '../components/ClassReportTable'
import { API_CLASS_REPORT } from '../constants'
import { UserOffice } from '../components/UserOffice'
import { DoreSelect } from '../components/DoreSelect'
import { useClassReport } from '../hooks/useClassReport'

const FormsPage = () => {
  const { data, error, isLoading } = useClassReport()
  const [specificSearch, setSpecificSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([{}])
  const [searchLoading, setSearchLoading] = useState(false)

  async function handleSubmit(values) {
    try {
      setSearchLoading(true)
      const response = await iaxios.post(API_CLASS_REPORT, {
        codequran: values.codequran == '0' ? '' : values.codequran,
        tshs: values.tshs,
        lname: values.lname,
        onvan_dore: values.onvan_dore,
        codemelli: values.codemelli,
        codek: values.codek
      }, {
        params: {
          page: 4,
          size: 20
        }
      })
      setSearchLoading(false)
      setSpecificSearch(true)
      setSearchResult(response.data.data.content)
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
              codequran: '',
              tshs: '',
              lname: '',
              onvan_dore: '',
              codemelli: '',
              codek: ''
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <FormField label="" >
                  <UserOffice name='codequran' label='موسسه' />
                  <FormField label="عنوان دوره" >
                    <DoreSelect isMulti={true} name="onvan_dore" signal={(selected) => { setFieldValue('onvan_dore', selected[0]?.label) }} />
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
                  {!specificSearch ? <ClassReportTable clients={data} isLoading={isLoading} error={error} />
                    :
                    <ClassReportTable clients={searchResult} isLoading={searchLoading} error={error} />
                  }
                </CardBox>

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
