import { mdiAccount, mdiBallotOutline, mdiMail, mdiSearchWeb } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import BaseButton from '../components/BaseButton'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import FormField from '../components/FormField'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../config'
import { TeacherTable } from '../components/TeacherTable'
import { useTeacher } from '../hooks/useTeacher'
import { API_SPECIFIC_TEACHER_SEARCH } from '../constants'

const FormsPage = () => {
  const { data, error, isLoading } = useTeacher()
  const [specificSearch, setSpecificSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([{}])
  const [searchLoading, setSearchLoading] = useState(false)

  async function handleSubmit(values) {
    try {
      setSearchLoading(true)
      const response = await iaxios.post(API_SPECIFIC_TEACHER_SEARCH, {
        firstName: values.fname,
        nationalCode: values.nationalCode
      }, {
        params: {
          page: 0,
          size: 5
        }
      })
      setSearchLoading(false)
      setSpecificSearch(true)
      setSearchResult(response.data.data)
    } catch (error) {

    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Forms')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="جستجوی افراد" main>
        </SectionTitleLineWithButton>

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
              <FormField label="آیتمهای جستجو" icons={[mdiAccount, mdiMail]}>
                <Field name="fname" placeholder="نام" />
                <Field name="lname" placeholder="نام خانوادگی" />
              </FormField>
              <FormField>
                <Field name="nationalCode" placeholder="کد ملی" />
                <Field name="mobile" placeholder="شماره همراه" />
              </FormField>
              <BaseButton type="submit" color="info" label="جستجو" />
              <BaseDivider />
              <BaseDivider />

              <SectionTitleLineWithButton icon={mdiSearchWeb} title="نتیجه جستجو" main />

              <CardBox hasTable>
                {!specificSearch ? <TeacherTable clients={data} isLoading={isLoading} error={error} />
                  :
                  <TeacherTable clients={searchResult} isLoading={searchLoading} error={error} />
                }
              </CardBox>
              {/* <FormField
                label="With help line and labelFor"
                labelFor="phone"
                help="Help line comes here"
              >
                <Field name="phone" placeholder="Phone" id="phone" />
              </FormField>

              <FormField label="Dropdown" labelFor="color">
                <Field name="color" id="color" component="select">
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                </Field>
              </FormField> */}


              {/* <FormField label="Textarea" hasTextareaHeight>
                <Field name="textarea" as="textarea" placeholder="Your text here" />
              </FormField>

              <BaseDivider />

              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
              </BaseButtons> */}
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>

      {/* <SectionTitle>Custom elements</SectionTitle>

      <SectionMain>
        <CardBox>
          <Formik
            initialValues={{ checkboxes: ['lorem'], switches: ['lorem'], radio: 'lorem' }}
            onSubmit={() => null}
          >
            <Form>
              <FormField label="Checkbox">
                <FormCheckRadioGroup>
                  <FormCheckRadio type="checkbox" label="Lorem">
                    <Field type="checkbox" name="checkboxes" value="lorem" />
                  </FormCheckRadio>
                  <FormCheckRadio type="checkbox" label="Ipsum">
                    <Field type="checkbox" name="checkboxes" value="ipsum" />
                  </FormCheckRadio>
                  <FormCheckRadio type="checkbox" label="Dolore">
                    <Field type="checkbox" name="checkboxes" value="dolore" />
                  </FormCheckRadio>
                </FormCheckRadioGroup>
              </FormField>

              <BaseDivider />

              <FormField label="Radio">
                <FormCheckRadioGroup>
                  <FormCheckRadio type="radio" label="Lorem">
                    <Field type="radio" name="radio" value="lorem" />
                  </FormCheckRadio>
                  <FormCheckRadio type="radio" label="Ipsum">
                    <Field type="radio" name="radio" value="ipsum" />
                  </FormCheckRadio>
                </FormCheckRadioGroup>
              </FormField>

              <BaseDivider />

              <FormField label="Switch">
                <FormCheckRadioGroup>
                  <FormCheckRadio type="switch" label="Lorem">
                    <Field type="checkbox" name="switches" value="lorem" />
                  </FormCheckRadio>
                  <FormCheckRadio type="switch" label="Ipsum">
                    <Field type="checkbox" name="switches" value="ipsum" />
                  </FormCheckRadio>
                </FormCheckRadioGroup>
              </FormField>
            </Form>
          </Formik>
          <BaseDivider />
          <FormField>
            <FormFilePicker label="Upload" color="info" icon={mdiUpload} />
          </FormField>
        </CardBox>
      </SectionMain> */}
    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
