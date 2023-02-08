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
import { API_SPECIFIC_TEACHER_SEARCH } from '../constants'
import { OrganizationTable } from '../components/OrganizationTable'
import { useOrgan } from '../hooks/useOrgan'
import { Organ } from '../components/Organ'
import { Town } from '../components/Town'

const OfficePage = () => {
  const { data, error, isLoading } = useOrgan()
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
        <title>{getPageTitle('Office')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="ادارات شهرستان" main>
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
                <Organ setFieldValue={() => { }} />
                <Town name='town' label='شهرستان' />
              </FormField>

              <FormField>
                <Field name="nationalCode" placeholder="کد ملی" />
                <Field name="mobile" placeholder="شماره همراه" />
              </FormField>
              <BaseButton type="submit" color="info" label="جستجو" />
              <BaseDivider />
              <BaseDivider />

              <SectionTitleLineWithButton icon={mdiSearchWeb} title="نتیجه جستجو" main />

              <CardBox hasTable>
                {!specificSearch ? <OrganizationTable clients={data} isLoading={isLoading} error={error} />
                  :
                  <OrganizationTable clients={searchResult} isLoading={searchLoading} error={error} />
                }
              </CardBox>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

OfficePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default OfficePage
