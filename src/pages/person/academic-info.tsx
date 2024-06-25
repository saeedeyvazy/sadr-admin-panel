import { Field, Form, Formik } from 'formik'
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
import { mdiBallotOutline } from '@mdi/js'
import BaseButton from '@/components/BaseButton'
import { InstUserType } from '@/components/InstUserType'
import FormField from '@/components/FormField'
import { useSnackbar } from 'notistack'
import { academicInfoValidation } from '@/validation/form'

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const addAcademicInfo = async (formData) => {
    try {

      await iaxios.post(API_PERSON_ACADEMIC_INFO, { ...formData, id_teacher: new Cookies().get('username') })

      setSearchLoading(false)
      setSpecificSearch(true)
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })

      setTimeout(() => { window.location.reload() }, 1200)

    } catch (error) {
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })

    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Forms')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title='افزودن اطلاعات تحصیلی' main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              maghta: '',
              reshte: '',
              moadel: '',
              sal_akhz: '',
              id_teacher: new Cookies().get('username'),

            }}
            validationSchema={academicInfoValidation}
            onSubmit={(values) => addAcademicInfo(values)}
          >
            {({ errors, values }) => (
              <Form>
                <FormField label=''>
                  <FormField label='مقطع تحصیلی' help={errors.maghta}>
                    <Field name='maghta' label='' />
                  </FormField>
                  <FormField label='رشته تحصیلی' help={errors.reshte}>
                    <Field name='reshte' label='' />
                  </FormField>
                  <FormField label='معدل' help={errors.moadel}>
                    <Field name='moadel' label='' type='number' />
                  </FormField>
                </FormField>
                <FormField label=''>
                  <FormField label='سال اخذ' help={errors.sal_akhz}>
                    <Field name='sal_akhz' label='' type='number' />
                  </FormField>
                  <FormField label='کد استاد' help={errors.id_teacher}>

                    <Field name='id_teacher' disabled label='' type='number' />

                  </FormField>
                </FormField>

                <div className='grid gap-y-3 md:grid-cols-6 md:gap-x-3'>
                  <BaseButton type="submit" color="info" label="افزودن"
                    disabled={errors.id_teacher || errors.maghta || errors.moadel || errors.reshte || errors.sal_akhz} />
                </div>
                <BaseDivider />
              </Form>)}
          </Formik>
        </CardBox>
      </SectionMain>
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
