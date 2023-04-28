
import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle } from '../config'
import { useSupport } from '../hooks/useSupport'
import { SupportTable } from '../components/SupportTable'

const FormsPage = () => {
  const { data, error, isLoading } = useSupport()
  const [specificSearch, setSpecificSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([{}])
  const [searchLoading, setSearchLoading] = useState(false)

  return (
    <>
      <Head>
        <title>{getPageTitle('Support')}</title>
      </Head>

      <SectionMain>

        <SectionTitleLineWithButton icon={null} title="دوره های حمایتی" main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{}}
            onSubmit={(values) => { }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <CardBox hasTable>
                  {!specificSearch ? <SupportTable clients={data} isLoading={isLoading} error={error} />
                    :
                    <SupportTable clients={searchResult} isLoading={searchLoading} error={error} />
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
