import { AssociationTable } from '@/components/AssociationTable'
import { AssosiationSelect } from '@/components/Assosiation'
import FormField from '@/components/FormField'
import { labels } from '@/constants/labels'
import { useAssosiationReport } from '@/hooks/useAssosiationReport'
import { assosiationValidation } from '@/validation/form'
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
import { API_ASSOSIATION } from '../constants'
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
      setCreateLoading(true)

      const request = { ...values, onvan_anjoman: values.onvan_anjoman_edit }
      delete request.onvan_anjoman_edit
      await iaxios.post(API_ASSOSIATION, {
        ...request, namayesh: 1
      })
      setCreateLoading(false)
      // setSpecificSearch(true)
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      console.log(error)
      setCreateLoading(false)
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
  }
  async function handleEdit(values) {
    setEditLoading(true)
    try {
      const request = { ...values, onvan_anjoman: values.onvan_anjoman_edit }
      delete request.onvan_anjoman_edit
      console.log(request)
      await iaxios.put(API_ASSOSIATION, {
        ...request, namayesh: 1
      })
      setEditLoading(false)

      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      console.log(error)
      setEditLoading(false)
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
  }
  function handleChange(selected, setFieldValue) {
    setFieldValue('onvan_anjoman', selected.value.onvan_anjoman)
    setFieldValue('onvan_anjoman_edit', selected.value.onvan_anjoman)
    setFieldValue('address_group', selected.value.address_group)
    setFieldValue('address_group_b', selected.value.address_group_b)
    setFieldValue('address_group_kh', selected.value.address_group_kh)
    setFieldValue('id', selected.value.id)
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
              onvan_anjoman: '',
              onvan_anjoman_edit: '',
              address_group: '',
              address_group_b: '',
              address_group_kh: '',
              id: 0

            }}
            validationSchema={assosiationValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue, errors }) => (
              <Form>
                <FormField>
                  <FormField label={labels.title} help={errors.onvan_anjoman}>
                    <AssosiationSelect name="onvan_anjoman" signal={(selected) => { handleChange(selected, setFieldValue) }} isMulti={false} />
                  </FormField>
                  <FormField label={`${labels.edit} ${labels.title}`} help={errors.onvan_anjoman_edit}>
                    <Field name="onvan_anjoman_edit" />
                    <Field style={{ visibility: 'hidden', width: 0 }} name="id" />
                  </FormField>
                </FormField>
                <FormField label={`${labels.address} ${labels.group}`} help={errors.address_group}>
                  <Field name="address_group" />
                </FormField>
                <FormField>
                  <FormField label={`${labels.address} ${labels.group} ${labels.brothers}`} help={errors.address_group_b}>
                    <Field name="address_group_b" />
                  </FormField>
                  <FormField label={`${labels.address} ${labels.group} ${labels.sisters}`} help={errors.address_group_kh}>
                    <Field name="address_group_kh" />
                  </FormField>
                </FormField>
                <div className='grid grid-cols-6 gap-x-2'>
                  <BaseButton isLoading={createLoading} type="submit" color="success" label="ایجاد انجمن" disabled={errors.address_group || errors.address_group_b || errors.address_group_kh || errors.onvan_anjoman} />
                  <BaseButton type="button" isLoading={editLoading} onClick={() => handleEdit(values)} color="warning" label="ویرایش انجمن" disabled={errors.address_group || errors.address_group_b || errors.address_group_kh || errors.onvan_anjoman || errors.onvan_anjoman_edit} />
                </div>
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
