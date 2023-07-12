import { AssociationStatusTable } from '@/components/AssociationStatusTable'
import { AssosiationSelect } from '@/components/Assosiation'
import { AssosiationStatus } from '@/components/AssosiationStatus/AssosiationStatus'
import BaseDivider from '@/components/BaseDivider'
import FormField from '@/components/FormField'
import { labels } from '@/constants/labels'
import { useAssosiationReport } from '@/hooks/useAssosiationReport'
import { mdiSearchWeb } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { ReactElement, useState } from 'react'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../config'
import { API_ASSOSIATION, API_ASSOSIATION_MEMBERSHIP } from '../constants'
import LayoutAuthenticated from '../layouts/Authenticated'


const FormsPage = () => {
  const { data, isLoading } = useAssosiationReport()
  const [specificSearch, setSpecificSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([{}])
  const [searchLoading, setSearchLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  async function handleSubmit(values) {
    try {

      setSearchLoading(true)

      const response = await iaxios.get(API_ASSOSIATION_MEMBERSHIP, { params: { vaziat: values.status, id_anjoman: values.id_anjoman == 0 ? '' : values.id_anjoman, page: 0, size: 1000 } }
      )
      console.log("asdhasjdh")
      console.log(typeof response.data)
      setSpecificSearch(true)
      setSearchResult(response.data.data.content)
      setSearchLoading(false)

      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      console.log(error)
      setSearchLoading(false)
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
  }
  async function handleEdit(values) {
    setEditLoading(true)
    try {
      const request = { vaziat: values.status, id: values.id }

      await iaxios.put(API_ASSOSIATION, {
        ...request, namayesh: 1
      })
      setEditLoading(false)
      setSpecificSearch(true)

      setSearchResult(data => data.map(item => item.id == values.id ? request : item))
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      console.log(error)
      setEditLoading(false)
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
  }
  function handleChange(selected, setFieldValue) {
    setFieldValue('status', selected.value.status)
    setFieldValue('id_anjoman', selected.value.id)
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('AssociationStatus')}</title>
      </Head>

      <SectionMain>

        <SectionTitleLineWithButton icon={null} title={`${labels.membership} ${labels.association}`} main></SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              status: '',
              id_anjoman: '',
              anjoman: ''

            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <FormField>
                  <FormField label={labels.association} >
                    <AssosiationSelect name="anjoman" signal={(selected) => { handleChange(selected, setFieldValue) }} isMulti={false} />
                  </FormField>
                </FormField>
                <FormField >
                  <AssosiationStatus name='status' label={`${labels.status} ${labels.association}`} setFieldValue={setFieldValue} />
                  <Field style={{ visibility: 'hidden', width: 0 }} name="id_anjoman" />
                </FormField>

                <div className='grid grid-cols-6 gap-x-2'>
                  <BaseButton isLoading={createLoading} type="submit" color="info" label={labels.search} />
                  <BaseButton type="button" isLoading={editLoading} onClick={() => handleEdit(values)} color="warning" label="ویرایش انجمن" />
                </div>
                <BaseDivider />
                <BaseDivider />

                <SectionTitleLineWithButton icon={mdiSearchWeb} title="نتیجه جستجو" main />
                <CardBox hasTable>
                  {specificSearch
                    ?
                    <AssociationStatusTable clients={searchResult} isLoading={searchLoading} /> :
                    null
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
