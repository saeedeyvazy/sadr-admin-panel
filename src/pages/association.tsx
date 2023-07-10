import { AssociationTable } from '@/components/AssociationTable'
import { labels } from '@/constants/labels'
import { useAssosiationReport } from '@/hooks/useAssosiationReport'
import { mdiSearchWeb } from '@mdi/js'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import BaseButton from '../components/BaseButton'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../config'
import { API_CLASS_REPORT } from '../constants'
import LayoutAuthenticated from '../layouts/Authenticated'

const FormsPage = () => {
  const { data, isLoading } = useAssosiationReport()
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
          page: 0,
          size: 40
        }
      })
      setSearchLoading(false)
      setSpecificSearch(true)
      setSearchResult(response.data.data.content)
    } catch (error) {
      alert(error)
    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Association')}</title>
      </Head>

      <SectionMain>

        <SectionTitleLineWithButton icon={null} title={labels.association} main></SectionTitleLineWithButton>

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
                <BaseButton type="submit" color="info" label="جستجو" />
                <BaseDivider />
                <BaseDivider />
                <SectionTitleLineWithButton icon={mdiSearchWeb} title="نتیجه جستجو" main />

                <CardBox hasTable>
                  {!specificSearch ? <AssociationTable clients={data} isLoading={isLoading} />
                    :
                    <AssociationTable clients={searchResult} isLoading={searchLoading} />
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
