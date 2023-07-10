import { Madrak } from '@/components/Madrak'
import { Organ } from '@/components/Organ/Organ'
import { labels } from '@/constants/labels'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { ReactElement, useState } from 'react'
import BaseButton from '../components/BaseButton'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import FormField from '../components/FormField'
import MulSelWithDefVal from '../components/MulSelWithDefVal'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../config'
import { API_DOREH_LIST, API_TEACHING_lICENSE_LIST, API_TEACHING_lICENSE_UPDATE } from '../constants'
import useAxios from '../hooks/useAxios'
import LayoutAuthenticated from '../layouts/Authenticated'

const FormsPage = () => {
  const [searchResult, setSearchResult] = useState([{ value: '', label: '' }])

  const { response, loading } = useAxios({ url: API_DOREH_LIST, method: 'get' })

  const findLearningOrder = async (selectedValue) => {

    const response = await iaxios.get(API_TEACHING_lICENSE_LIST, { params: { madrak: selectedValue.madrak } })

    setSearchResult(response?.data?.data.map((item, index) => ({ value: index, label: item.onvan_dore })))

  }

  const { enqueueSnackbar } = useSnackbar()

  async function handleSubmit(values) {
    try {
      await iaxios.put(API_TEACHING_lICENSE_UPDATE, {
        id_madrak: Number(values.madrak),
        id_list: values?.right?.map(right => ({ id: right.value?.id ? `${right.value.id}` : `${right.value}` }))

      })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })

    } catch (error) {
      console.log(error)
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('TeachingLicense')}</title>
      </Head>

      <SectionMain>

        <SectionTitleLineWithButton icon={null} title={labels.learningConstraint} main></SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              madrak: '',
              organ: '',
              id_organ: '',
              right: ''
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <FormField>
                  <Organ setFieldValue={setFieldValue} />
                  <FormField label=''>
                    <Madrak setFieldValue={setFieldValue} onchange={() => findLearningOrder(values)} />
                  </FormField>
                </FormField>
                <Field name='id_organ' style={{ visibility: 'hidden', width: '0' }} />
                <BaseDivider />
                <BaseDivider />
                <BaseDivider />

                <FormField label={labels.learningConstraintCourseList}>
                  <MulSelWithDefVal defaultValue={searchResult} name='right' signal={(val) => { setFieldValue('right', val) }} optionList={response?.map((item) => ({ value: item.index, label: item.onvan_dore }))} />
                </FormField>

                <BaseButton type="submit" color="info" label="ذخیره" />
                <BaseDivider />
                <BaseDivider />
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
