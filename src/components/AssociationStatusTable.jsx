import { mdiCardAccountDetails, mdiTrashCan } from '@mdi/js'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { useRef, useState } from 'react'
import { iaxios } from '../config'
import { API_ASSOSIATION_MEMBERSHIP, API_CLASS_INFO, API_CLASS_STUDENT_INFO } from '../constants'
import { AssosiationStatus } from './AssosiationStatus/AssosiationStatus'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import BaseDivider from './BaseDivider'
import CardBoxModal from './CardBoxModal'
import FormField from './FormField'
import { Loading } from './Loading'
export const AssociationStatusTable = ({ clients, isLoading }) => {

  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)
  const [teacherDetail, setTeacherDetail] = useState()
  const [classInfo, setClassInfo] = useState()

  const [selectedClient, setSelectedClient] = useState({
    id: 0,
    pic: '',
    onvan_anjoman: '',
    vaziat: 0,
    tarikh: '',
    fname: '',
    lname: '',
    codemelli: '',
    mob: '',
    jensiyat: '',
    jensiyatName: '',
    vaziatName: ''
  })

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))
  const numPages = Math.ceil(clients.length / perPage)
  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalDetailActive, setIsModalDetailActive] = useState(false)

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()


  const handleSubmitMoassese = async () => {
    if (updateMoasseseFormRef.current)
      updateMoasseseFormRef.current.handleSubmit()
    handleCloseDetailModal()
  }


  const handleCloseDetailModal = () => {
    setIsModalDetailActive(false)
  }

  const updateMoasseseFormRef = useRef()

  async function fetchDetail(id) {
    try {
      const response = await iaxios.get(API_CLASS_STUDENT_INFO + "?codek=" + id)
      const classInfoResponse = await iaxios.get(API_CLASS_INFO, { params: { codek: id } })
      setTeacherDetail(response.data.data)

      setClassInfo(classInfoResponse.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function handleSubmit(values) {
    try {
      const response = await iaxios.put(API_ASSOSIATION_MEMBERSHIP, { id: selectedClient.id, vaziat: values.status })
      setTeacherDetail(response.data.data)
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      console.log(error)
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
  }

  async function deleteItem(id) {
    try {
      await iaxios.delete(`${API_ASSOSIATION_MEMBERSHIP}/${id}`)
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      console.log(error)
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
  }


  return (
    <>
      <CardBoxModal
        title="جزییات"
        buttonColor="info"
        buttonLabel="تایید"
        isActive={isModalDetailActive}
        onConfirm={handleSubmitMoassese}
        onCancel={handleCloseDetailModal}
        innerModalClassName='md:w-6/12'
      >
        <BaseDivider />
        <BaseDivider />
        <Formik
          initialValues={{
            status: '',
          }}
          innerRef={updateMoasseseFormRef}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {selectedClient.pic ? <img src={`data:image/jpeg;base64,${selectedClient.pic}`} alt='' className='w-24 h-24' /> : 'تصویر ندارد'}
              <FormField>
                <FormField  >
                  <AssosiationStatus name='status' setFieldValue={setFieldValue} />
                </FormField>
                <FormField />
              </FormField>
            </Form>)}
        </Formik>
        <BaseDivider />
        <BaseDivider />
      </CardBoxModal >
      {
        isLoading ? <Loading />
          :
          <table>
            <thead>
              <tr className='[&>*]:text-right whitespace-nowrap'>
                <th>عنوان انجمن</th>
                <th>نام و نام خانوادگی</th>
                <th>کد ملی</th>
                <th>شماره همراه</th>
                <th>وضعیت</th>
                <th>تاریخ</th>

                <th />
              </tr>
            </thead>
            <tbody>
              {clientsPaginated.map((client) => (
                <tr key={client.id} className='[&>*]:text-right whitespace-nowrap'>
                  <td >{client.onvan_anjoman}</td>
                  <td >{`${client.fname} ${client.lname}`}</td>
                  <td className='text-sm'>{client.codemelli}</td>
                  <td className="lg:w-32">{client.mob}</td>
                  <td className="lg:w-32">{client.vaziatName}</td>
                  <td className="lg:w-32">{client.tarikh}</td>

                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons className="justify-start lg:justify-between" noWrap>
                      <BaseButton onClick={() => deleteItem(client.id)} small color='danger' icon={mdiTrashCan} />
                      <BaseButton
                        color="info"
                        icon={mdiCardAccountDetails}
                        onClick={() => { fetchDetail(client.codek); setSelectedClient(client); setIsModalDetailActive(true) }}
                        small
                      />
                    </BaseButtons>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
      }
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <BaseButtons>
            {pagesList.map((page) => (
              <BaseButton
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </BaseButtons>
          <small className="mt-6 md:mt-0">
            صفحه {currentPage + 1} از {numPages}
          </small>
        </div>
      </div>
    </>
  )
}
