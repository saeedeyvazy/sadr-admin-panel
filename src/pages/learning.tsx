import { mdiBallotOutline } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useRef, useState } from 'react'
import BaseButton from '../components/BaseButton'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import FormField from '../components/FormField'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle, iaxios } from '../config'
import { useTeacher } from '../hooks/useTeacher'
import { API_MADRAK, API_ORGAN_LIST, API_SPECIFIC_TEACHER_SEARCH } from '../constants'
import { Organ } from '../components/Organ/Organ'
import { DoreSelect } from '../components/DoreSelect'
import { Position } from '../components/Position'
import { useSnackbar } from 'notistack'
import { Madrak } from '../components/Madrak'
import { Group } from '../components/Group'

const FormsPage = () => {
  const { data, error, isLoading } = useTeacher()
  const [specificSearch, setSpecificSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([{}])
  const [searchLoading, setSearchLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState({})
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const organRef = useRef()
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
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleOrganSubmit(organValueObj) {
    try {
      const response = await iaxios.post(API_ORGAN_LIST, { name_organ: organValueObj.newOrgan, namayesh: true })
      enqueueSnackbar('???????????? ???? ???????????? ?????????? ????', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('?????? ???? ?????????? ????????????', { variant: 'error' })
    }

  }

  async function handleOrganDelete(organId) {
    try {
      const response = await iaxios.delete(`${API_ORGAN_LIST}/${organId}`)
      enqueueSnackbar('???????????? ???? ???????????? ?????????? ????', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('?????? ???? ?????????? ????????????', { variant: 'error' })
    }

  }

  async function handleMadrakSubmit(values) {
    try {
      const response = await iaxios.post(API_MADRAK, { ID: values.id_organ, id_organ: values.id_organ, onvan_dore: values.newMadrak })
      enqueueSnackbar('???????????? ???? ???????????? ?????????? ????', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('?????? ???? ?????????? ????????????', { variant: 'error' })
    }
  }

  async function handleMadrakDelete(id) {
    try {
      const response = await iaxios.delete(`${API_MADRAK}/${id}`)
      enqueueSnackbar('???????????? ???? ???????????? ?????????? ????', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('?????? ???? ?????????? ????????????', { variant: 'error' })
    }
  }

  async function handleMadrakUpdate(values) {
    try {
      const response = await iaxios.put(`${API_MADRAK}`, { ID: values.madrak, id: values.madrak, id_organ: values.id_organ, onvan_dore: values.newMadrak })
      enqueueSnackbar('???????????? ???? ???????????? ?????????? ????', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('?????? ???? ?????????? ????????????', { variant: 'error' })
    }
  }

  async function handleOrganUpdate(values) {
    try {
      const response = await iaxios.put(`${API_ORGAN_LIST}`, { name_organ: values.newOrgan, namayesh: true, id: values.organ })
      enqueueSnackbar('???????????? ???? ???????????? ?????????? ????', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('?????? ???? ?????????? ????????????', { variant: 'error' })
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Learning')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="???????? ?????? ?????????? ?????????? ????????" main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              newOrgan: '',
              organ: ''
            }}
            onSubmit={(values) => handleOrganSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <FormField>
                  <Organ setFieldValue={setFieldValue} />
                  <FormField label='?????????? ???????????? ??????'>
                    <Field label="" name="newOrgan" placeholder="?????? ??????????" />
                  </FormField>
                </FormField>
                <div className='grid gap-y-3 md:grid-cols-6 md:gap-x-3'>
                  <BaseButton type="submit" color="info" label="????????????" />
                  <BaseButton onClick={() => handleOrganUpdate(values)} color="warning" label="????????????" />
                  <BaseButton onClick={() => handleOrganDelete(values.organ)} color="danger" label="?????? ??????????" />
                </div>
                <BaseDivider />
              </Form>)}
          </Formik>
        </CardBox>

        <SectionTitleLineWithButton icon={mdiBallotOutline} title="??????????" main />
        <CardBox>
          <Formik
            initialValues={{
              newMadrak: '',
              madrak: '',
              id_organ: '',
            }}
            onSubmit={(values) => handleMadrakSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <FormField>
                  <Madrak setFieldValue={setFieldValue} />
                  <FormField label='???????? ???????????? ??????'>
                    <Field label="" name="newMadrak" placeholder="?????? ????????" />
                  </FormField>
                </FormField>
                <Field name='id_organ' style={{ visibility: 'hidden', width: '0' }} />
                <div className='grid gap-y-3 md:grid-cols-6 md:gap-x-3'>
                  <BaseButton type="submit" color="info" label="????????????" />
                  <BaseButton color="warning" label="????????????" onClick={() => handleMadrakUpdate(values)} />
                  <BaseButton color="danger" label="?????? ????????" onClick={() => handleMadrakDelete(values.madrak)} />
                </div>
                <BaseDivider />
              </Form>)}
          </Formik>
        </CardBox>


        <SectionTitleLineWithButton icon={mdiBallotOutline} title="???????? ?????? ???????????? ??????????" main />
        <CardBox>
          <Formik
            initialValues={{
              fname: '',
              pos3: '',
              pos2: '',
              pos1: '',
              group: ''
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='?????? ????????'>
                <DoreSelect signal={(selected) => setSelectedOption(selected.value)} />
              </FormField>
              <FormField label='?????????? ??????'>
                <Position name='pos1' />
                <Field label="" name="e1_onvan" placeholder="??????" value={selectedOption?.e1_onvan} />
                <Field label="" name="e1_semat" placeholder="??????" value={selectedOption?.e1_semat} />
              </FormField>
              <FormField label='?????????? ??????'>
                <Position name='pos2' />
                <Field label="" name="test" placeholder="??????" value={selectedOption?.e2_onvan} />
                <Field label="" name="test" placeholder="??????" value={selectedOption?.e2_semat} />
              </FormField>
              <FormField label='?????????? ??????'>
                <Position name='pos3' />
                <Field label="" name="test" placeholder="??????" value={selectedOption?.e3_onvan} />
                <Field label="" name="test" placeholder="??????" value={selectedOption?.e3_semat} />
              </FormField>
              <FormField label='?????????????? ???????? ????????????'>
                <Field label="" name="test" placeholder="?????????? ??????????????????" value={selectedOption?.onvan_govahi} />
                <Field label="" name="test" placeholder="??????????" value={selectedOption?.gerayesh} />
                <Field label="" name="test" placeholder="???????? ????????????" value={selectedOption?.saat} />
              </FormField>
              <FormField>
                <Group />
                <Organ />
              </FormField>
              <div className='grid gap-y-3 md:grid-cols-6 md:gap-x-3'>
                <BaseButton type="submit" color="info" label="?????????? ??????????????" />
              </div>
              <BaseDivider />
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
