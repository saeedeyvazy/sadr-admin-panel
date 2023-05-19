import { mdiAccount, mdiSearchWeb } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import BaseButton from '../../components/BaseButton'
import BaseButtons from '../../components/BaseButtons'
import CardBox from '../../components/CardBox'
import FormField from '../../components/FormField'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { DirectorBoardCardBox } from '../../components/institution/DirectorBoardCardBox'
import { getPageTitle, iaxios } from '../../config'
import { API_DIRECOR_BOARD_LIST } from '../../constants'
import { labels } from '../../constants/labels'
import { deleteBoardMember, isLoading, memberList } from '../../features/institution/director/director.slice'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { directorBoardValidation } from '../../validation/form'
import { searchByNatCode, useDirectorBoard } from './hooks/useDirectorBoard'
import { Loading } from '../../components/Loading'
import { useDispatch } from 'react-redux'

const DirectorBoard = () => {
  const dispatch = useDispatch()
  useDirectorBoard()
  const directorBoardMember = useSelector(memberList)
  const loading = useSelector(isLoading)
  const { enqueueSnackbar } = useSnackbar()

  async function addDirectorBoard(values) {
    try {
      const response = await iaxios.post(API_DIRECOR_BOARD_LIST, { code_m_kh: new Cookies().get('username'), code_p: values.nationalCode, ozviat: "عضو" })
      enqueueSnackbar(labels.succeed, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.response.data.message || labels.unsucceed, { variant: 'error' })
    }
  }

  async function search(values, setFieldValue) {
    try {
      const resp = await searchByNatCode(values, setFieldValue)

    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" })
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('DirectorBoard')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={null} title={labels.directorBoard} main></SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={{
              nationalCode: '',
              name: ''
            }}
            onSubmit={(values) => { addDirectorBoard(values) }}
            validationSchema={directorBoardValidation}
          >
            {({ setFieldValue, errors, values }) => (
              <Form>
                <FormField label={labels.searchItem} icons={[mdiAccount]} help={errors.nationalCode}>
                  <Field name="nationalCode" placeholder={labels.nationalCode} />
                  <BaseButton onClick={() => search(values, setFieldValue)} type='button' color='info' label={labels.search} icon={mdiSearchWeb} outline />
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
        <SectionTitleLineWithButton icon={null} title={labels.directorBoardMember} main></SectionTitleLineWithButton>
        {loading && <Loading />}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {directorBoardMember && directorBoardMember.length && directorBoardMember.map((item) => (
            <DirectorBoardCardBox key={item.id} member={item} deleteItem={() => dispatch(deleteBoardMember(item.id))} />
          ))}
        </div>

      </SectionMain>
    </>
  )
}

DirectorBoard.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DirectorBoard
