import BaseButton from '@/components/BaseButton'
import { Gender } from '@/components/Gender'
import { API_ADD_PERSON } from '@/constants'
import { addPersonValidation } from '@/validation/form'
import FormField from '@component/FormField'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import CardBox from '../../components/CardBox'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../../config'
import { labels } from '../../constants/labels'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { DatePicker } from 'react-advance-jalaali-datepicker'

const Insurance = () => {
  const { enqueueSnackbar } = useSnackbar()

  async function handleSubmit(values) {
    try {
      const { date } = values
      const ts = date.split("/")[0]
      const tm = date.split("/")[1]
      const tr = date.split("/")[2]
      console.log(values, ts, tm, tr)
      await iaxios.post(API_ADD_PERSON, { ts, tm, tr, ...values })

      enqueueSnackbar(labels.succeed, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(labels.unsucceed, { variant: 'error' })
      console.log(error)
    }
  }
  return (
    <>

      <Head>
        <title>{getPageTitle('AddPerson')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={null} title={labels.addPerson} main></SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={{
              fname: '',
              lname: '',
              fthname: '',
              date: '',
              codemelli: '',
              jensiyat: '',
              mob: ''
            }}
            validationSchema={addPersonValidation}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors }) => (
              <Form>
                <FormField label="" >
                  <FormField label={labels.fname} help={errors.fname}>
                    <Field name='fname' />
                  </FormField>
                  <FormField label={labels.lname} help={errors.lname}>
                    <Field name='lname' />
                  </FormField>
                  <FormField label={labels.fthname} help={errors.fthname}>
                    <Field name='fthname' />
                  </FormField>
                </FormField>

                <FormField label="" >
                  <Gender name='jensiyat' label={labels.gender} help={errors.jensiyat} />

                  <FormField label={labels.nationalCode} help={errors.codemelli}>
                    <Field name='codemelli' type="number" />
                  </FormField>

                  <FormField label={labels.mobile} help={errors.mob}>
                    <Field name='mob' />
                  </FormField>
                </FormField>
                <FormField label={labels.workStartDate} help={errors.startDate}>
                  <DatePicker
                    inputComponent={(props) => <Field name='date' className="popo" {...props} />}
                    placeholder="انتخاب تاریخ"
                    format="jYYYY/jMM/jDD"
                    onChange={(unix, formatted) => setFieldValue("date", formatted)}
                    id="datePicker"
                    preSelected=""
                    name='date'
                  />
                </FormField>
                <BaseButton disabled={errors.fname || errors.lname || errors.fthname || errors.codemelli || errors.mob} color='info' type='submit' label={labels.addPerson} />

              </Form >)
            }
          </Formik >
        </CardBox>
      </SectionMain>
    </>
  )
}

Insurance.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Insurance
