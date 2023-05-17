import { Form, Formik } from 'formik'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { ReactElement, useState } from 'react'
import BaseButton from '../components/BaseButton'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import { DoreSelect } from '../components/DoreSelect'
import FormField from '../components/FormField'
import MulSelWithDefVal from '../components/MulSelWithDefVal'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../config'
import { API_DOREH_LIST, API_LEARNING_LEFT_SIDE, API_LEARNING_RIGHT_SIDE, API_SAVE_LEARN_TREE } from '../constants'
import useAxios from '../hooks/useAxios'
import { useClassReport } from '../hooks/useClassReport'
import LayoutAuthenticated from '../layouts/Authenticated'

const FormsPage = () => {
  const { data, error, isLoading } = useClassReport()
  const [specificSearch, setSpecificSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([{ value: '', label: '' }])
  const [leftSearchResult, setLeftSearchResult] = useState([{ value: '', label: '' }])

  const [searchLoading, setSearchLoading] = useState(false)
  const { response, loading } = useAxios({ url: API_DOREH_LIST, method: 'get' })

  const findLearningOrder = async (selectedValue) => {

    const response = await iaxios.get(API_LEARNING_RIGHT_SIDE, { params: { onvan: selectedValue.value.id } })
    const responseLeft = await iaxios.get(API_LEARNING_LEFT_SIDE, { params: { onvan: selectedValue.value.id } })

    setSearchResult(response?.data?.data.map((item) => ({ value: item.id_right, label: item.onvan_dore })))
    setLeftSearchResult(responseLeft?.data?.data.map((item) => ({ value: item.id_left, label: item.onvan_dore })))
  }

  const { enqueueSnackbar } = useSnackbar()

  async function handleSubmit(values) {
    try {
      await iaxios.post(API_SAVE_LEARN_TREE, {
        id_onvan: values.id_onvan,
        id_left_list: values?.left?.map(left => ({ id: left.value?.id ? left.value.id : left.value })),
        id_right_list: values?.right?.map(right => ({ id: right.value?.id ? right.value.id : right.value }))

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
        <title>{getPageTitle('LearnTree')}</title>
      </Head>

      <SectionMain>

        <SectionTitleLineWithButton icon={null} title="درخت آموزشی" main></SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              left: '',
              right: '',
              id_onvan: ''
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <FormField label='نام دوره'>
                  <DoreSelect name='id_onvan' isMulti={false} signal={(selected) => { setFieldValue('id_onvan', selected.value.id); findLearningOrder(selected) }} />
                </FormField>

                <BaseDivider />
                <BaseDivider />
                <BaseDivider />

                <FormField label='دوره های بعدی'>
                  <MulSelWithDefVal defaultValue={searchResult} name='right' signal={(val) => { setFieldValue('right', val) }} optionList={response?.map(item => ({ value: item, label: item.onvan_dore }))} />
                </FormField>

                <BaseDivider />
                <BaseDivider />
                <BaseDivider />

                <FormField label='دوره های قبلی'>
                  <MulSelWithDefVal defaultValue={leftSearchResult} name='left' signal={(val) => { setFieldValue('left', val) }} optionList={response?.map(item => ({ value: item, label: item.onvan_dore }))} />
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
