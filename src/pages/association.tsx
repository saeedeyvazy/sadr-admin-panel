import { AssociationTable } from '@/components/AssociationTable'
import FormField from '@/components/FormField'
import { labels } from '@/constants/labels'
import { useAssosiationReport } from '@/hooks/useAssosiationReport'
import { assosiationValidation } from '@/validation/form'
import { mdiSearchWeb } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import BaseButton from '../components/BaseButton'
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
              onvan_anjoman: '',
              address_group: '',
              address_group_b: '',
              address_group_kh: ''

            }}
            validationSchema={assosiationValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue, errors }) => (
              <Form>
                <FormField>
                  <FormField label={labels.title} help={errors.onvan_anjoman}>
                    <Field name="onvan_anjoman" />
                  </FormField>
                  <FormField label={`${labels.address} ${labels.group}`} help={errors.address_group}>
                    <Field name="address_group" />
                  </FormField>
                </FormField>
                <FormField>
                  <FormField label={`${labels.address} ${labels.group} ${labels.brothers}`} help={errors.address_group_b}>
                    <Field name="address_group_b" />
                  </FormField>
                  <FormField label={`${labels.address} ${labels.group} ${labels.sisters}`} help={errors.address_group_kh}>
                    <Field name="address_group_kh" />
                  </FormField>
                </FormField>
                <BaseButton type="submit" color="success" label="ایجاد انجمن" disabled={errors.address_group || errors.address_group_b || errors.address_group_kh || errors.onvan_anjoman} />
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
