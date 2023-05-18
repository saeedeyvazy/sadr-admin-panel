import { mdiAccount, mdiSearchWeb } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import BaseButton from '../../components/BaseButton'
import BaseButtons from '../../components/BaseButtons'
import CardBox from '../../components/CardBox'
import FormField from '../../components/FormField'
import { Loading } from '../../components/Loading'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { DirectorBoardCardBox } from '../../components/institution/DirectorBoardCardBox'
import { getPageTitle, iaxios } from '../../config'
import { API_DIRECOR_BOARD_LIST } from '../../constants'
import { labels } from '../../constants/labels'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { directorBoardValidation } from '../../validation/form'
import { searchByNatCode, useDirectorBoard } from './hooks/useDirectorBoard'

const DirectorBoard = () => {
  const { response, loading } = useDirectorBoard()
  const [managerData, setManagerData] = useState([])

  useEffect(() => {
    setManagerData(response)
  }, [response])
  const { enqueueSnackbar } = useSnackbar()

  async function addDirectorBoard(values) {
    try {
      const response = await iaxios.post(API_DIRECOR_BOARD_LIST, { code_m_kh: new Cookies().get('username'), code_p: values.nationalCode, ozviat: "عضو" })
      setManagerData([...managerData, values])
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

  const deleteItem = async (id) => {
    try {
      iaxios.delete(`${API_DIRECOR_BOARD_LIST}/${id}`)
      enqueueSnackbar(labels.succeed, { variant: "success" })
    } catch (error) {
      enqueueSnackbar(labels.unsucceed, { variant: "error" })
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
          {managerData && managerData.length && managerData.map((item) => (
            <DirectorBoardCardBox key={item.id} member={item} deleteItem={() => deleteItem(item.id)} />
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
