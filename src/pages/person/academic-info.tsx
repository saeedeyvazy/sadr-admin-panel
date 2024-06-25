import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import BaseDivider from '../../components/BaseDivider'
import CardBox from '../../components/CardBox'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { TeacherTable } from '../../components/TeacherTable'
import { getPageTitle, iaxios } from '../../config'
import { API_PERSON_ACADEMIC_INFO } from '../../constants'
import LayoutAuthenticated from '../../layouts/Authenticated'
import Cookies from 'universal-cookie'
import { usePersonAcademic } from '@/hooks/usePersonAcademic'
import { PersonAcademicTable } from '@/components/PersonAcademicTable'

const FormsPage = () => {
  const { data, error, isLoading, totalTeacherLength } = usePersonAcademic()
  const [specificSearch, setSpecificSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([{}])
  const [searchLoading, setSearchLoading] = useState(false)

  async function handleSubmit(values) {
    try {
      setSearchLoading(true)
      const response = await iaxios.post(`${API_PERSON_ACADEMIC_INFO}`, {
        params: {
          page: 0,
          size: 5,
          code: new Cookies().get('username')
        }
      })
      setSearchLoading(false)
      setSpecificSearch(true)
      setSearchResult(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Forms')}</title>
      </Head>

      <SectionMain>
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
              <BaseDivider />
              <div className='flex items-center justify-between'>
                <SectionTitleLineWithButton icon={null} title="اطلاعات تحصیلی " />
              </div>

              <CardBox hasTable>
                {!specificSearch ? <PersonAcademicTable clients={data} isLoading={isLoading} error={error} />
                  :
                  <PersonAcademicTable clients={searchResult} isLoading={searchLoading} error={error} />
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
