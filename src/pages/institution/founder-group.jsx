import { mdiAccount, mdiSearchWeb } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BaseButton from '../../components/BaseButton'
import BaseButtons from '../../components/BaseButtons'
import CardBox from '../../components/CardBox'
import FormField from '../../components/FormField'
import { Loading } from '../../components/Loading'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { DirectorBoardCardBox } from '../../components/institution/DirectorBoardCardBox'
import { getPageTitle } from '../../config'
import { labels } from '../../constants/labels'
import { addFounder, deleteFounder, isLoading, memberList } from '../../features/institution/founder/founder.slice'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { directorBoardValidation } from '../../validation/form'
import { searchByNatCode, useFounder } from './hooks/useFounder'

const FounderGroup = () => {
  const dispatch = useDispatch()
  useFounder()
  const founderMemberList = useSelector(memberList)
  const loading = useSelector(isLoading)
  const [isSearchLoading, setIsSearchLoading] = useState(false)

  async function search(values, setFieldValue) {
    setIsSearchLoading(true)
    await searchByNatCode(values, setFieldValue)
    setIsSearchLoading(false)
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('FounderGroup')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={null} title={labels.founderGroup} main></SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={{
              nationalCode: '',
              name: ''
            }}
            onSubmit={(values) => { dispatch(addFounder(values)) }}
            validationSchema={directorBoardValidation}
          >
            {({ setFieldValue, errors, values }) => (
              <Form>
                <FormField label={labels.searchItem} icons={[mdiAccount]} help={errors.nationalCode}>
                  <Field name="nationalCode" placeholder={labels.nationalCode} />
                  <BaseButton isLoading={isSearchLoading} onClick={() => search(values, setFieldValue)} type='button' color='info' label={labels.search} icon={mdiSearchWeb} outline />
                </FormField>

                <FormField label=''>
                  <FormField label={labels.fullName} help={errors.name}>
                    <Field name="name" placeholder={labels.fullName} />
                  </FormField>
                  <FormField label='' help={errors.startDate}>

                  </FormField>
                </FormField>
                <BaseButtons>
                  <BaseButton disabled={errors.name || errors.nationalCode} color='success' label={labels.addDirector} outline type='submit' />
                </BaseButtons>
              </Form>
            )}
          </Formik>
        </CardBox>
        <CardBox>
          <SectionTitleLineWithButton icon={null} title={labels.founderGroupMember} main></SectionTitleLineWithButton>
          {loading && <Loading />}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {founderMemberList && founderMemberList.map((item) => (
              <DirectorBoardCardBox key={item.id} member={item} deleteItem={() => dispatch(deleteFounder(item.id))} />
            ))}
          </div>
        </CardBox>
      </SectionMain>
    </>
  )
}

FounderGroup.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FounderGroup
