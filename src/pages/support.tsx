
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../config'
import { useSupport } from '../hooks/useSupport'
import { SupportTable } from '../components/SupportTable'
import FormField from '../components/FormField'
import { DoreSelect } from '../components/DoreSelect'
import { Organ } from '../components/Organ/Organ'
import { DatePicker } from 'react-advance-jalaali-datepicker'
import BaseButton from '../components/BaseButton'
import { API_SUPPORT_SEARCH } from '../constants'
import { useSnackbar } from 'notistack'

const FormsPage = () => {
  const { data, error, isLoading } = useSupport()
  const [specificSearch, setSpecificSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([{}])
  const [searchLoading, setSearchLoading] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const handleSubmit = async (values) => {
    const [mohlat_s, mohlat_m, mohlat_r] = values.exp_date.split("/")
    try {
      console.log({
        id_organ: values.organ,
        id_dore: values.dore,
        onvan_emza: values.sign_title,
        post_emza: values.sign_name,
        mohlat_s: +mohlat_s,
        mohlat_m: +mohlat_m,
        mohlat_r: +mohlat_r,
        zarfiat: values.cpacity,
        faal: true
      })
      await iaxios.post(API_SUPPORT_SEARCH, {
        id_organ: values.organ,
        id_dore: values.dore,
        onvan_emza: values.sign_title,
        post_emza: values.sign_name,
        mohlat_s: +mohlat_s,
        mohlat_m: +mohlat_m,
        mohlat_r: +mohlat_r,
        zarfiat: values.cpacity,
        faal: true
      })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      console.log(error)
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })

    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Support')}</title>
      </Head>

      <SectionMain>

        <SectionTitleLineWithButton icon={null} title="دوره های حمایتی" main></SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={{
              cpacity: '',
              sign_name: '',
              sign_title: '',
              zarfiat: 0,
              organ: 0,
              dore: 0,
              exp_date: ''
            }}
            onSubmit={(values) => { handleSubmit(values) }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <FormField label="" >
                  <FormField label="عنوان دوره" >
                    <DoreSelect isMulti={false} name="dore" signal={(selected) => { setFieldValue('dore', selected.value.id) }} />
                  </FormField>
                  <FormField>
                    <Organ setFieldValue={setFieldValue} />
                  </FormField>
                </FormField>
                <FormField>
                  <FormField label="نام امضا کننده">
                    <Field label="سمت امضا کننده" name="sign_title" placeholder="" />
                  </FormField>
                  <FormField label="نام امضا کننده">
                    <Field name="sign_name" placeholder="" />
                  </FormField>
                </FormField>
                <FormField>
                  <FormField label="ظرفیت حمایتی">
                    <Field name="cpacity" placeholder="" />
                  </FormField>
                  <FormField label="تاریخ">
                    <DatePicker
                      inputComponent={(props) => <Field name='exp_date' className="popo" {...props} />}
                      placeholder="انتخاب تاریخ"
                      format="jYYYY/jMM/jDD"
                      onChange={(unix, formatted) => setFieldValue("exp_date", formatted)}
                      id="datePicker"
                      preSelected="1402/06/25"

                    />
                  </FormField>
                </FormField>
                <BaseButton type="submit" color="success" label="ایجاد دوره حمایتی" />
              </Form>)}
          </Formik>
        </CardBox>
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
