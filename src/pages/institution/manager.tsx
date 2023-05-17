import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import CardBox from '../../components/CardBox'
import CardBoxClient from '../../components/CardBoxClient'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { useManager } from './hooks/useManager'
import { ManagerCardBox } from '../../components/institution/ManagerCardBox'

const ManagerPage = () => {
  const { response, loading } = useManager()
  useEffect(() => {
    console.log("&&&&&&&&", response)
  }, [response])
  return (
    <>
      <Head>
        <title>{getPageTitle('Manager')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={null} title="مدیر عامل" main></SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={{
              nationalCode: ''
            }}
            onSubmit={(values) => { }}
          >
            <Form>
            </Form>
          </Formik>
        </CardBox>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {response && response.length && response.map((item) => (
            <ManagerCardBox key={item.id} manager={item} />
          ))}
        </div>

      </SectionMain>
    </>
  )
}

ManagerPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ManagerPage
