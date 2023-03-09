import { mdiBallotOutline, mdiSearchWeb } from '@mdi/js'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement } from 'react'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle } from '../config'
import { DocumentTable } from '../components/DocumentTable'
import { DocStatus } from '../components/DocStatus/index'
import { useSelector } from 'react-redux'
import { docList, getDocumentList, isLoading } from '../features/document/document.slice'
import { useDispatch } from 'react-redux'
import BaseButton from '../components/BaseButton'

const FormsPage = () => {
  const documentList = useSelector(docList)
  const isLoadingDocList = useSelector(isLoading)
  const dispatch = useDispatch()
  async function handleSubmit(values) {
    console.log("----------")
    console.log(values)
    dispatch(getDocumentList(values.status))
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
              status: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <DocStatus onChange={setFieldValue} />
                <BaseDivider />
                <BaseDivider />
                <BaseButton type="submit" color="info" label="جستجو" />
                <BaseDivider />

                <SectionTitleLineWithButton icon={mdiSearchWeb} title="نتیجه جستجو" main />

                <CardBox hasTable>
                  <DocumentTable clients={documentList} isLoading={isLoadingDocList} error='' />
                </CardBox>
              </Form>)}
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

FormsPage.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
