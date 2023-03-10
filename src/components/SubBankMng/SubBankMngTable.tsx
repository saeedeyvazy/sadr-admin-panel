import { mdiEye, mdiTrashCan, mdiUpdate } from '@mdi/js'
import React, { useRef, useState } from 'react'
import { User } from '../../interfaces'
import BaseButton from '../BaseButton'
import BaseButtons from '../BaseButtons'
import CardBoxModal from '../CardBoxModal'
import { Loading } from '../Loading'
import { API_SUB_BANK_LIST, API_USER_PASSWORD } from '../../constants'
import BaseDivider from '../BaseDivider'
import { iaxios } from '../../config'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import FormField from '../FormField'
import { useSnackbar } from 'notistack'
import { UserType } from '../UserType'
import FormCheckRadio from '../FormCheckRadio'
import FormCheckRadioGroup from '../FormCheckRadioGroup'
import * as Yup from 'yup'

export const SubBankMngTable = ({ clients, isLoading, error }) => {

  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)
  const [teacherDetail, setTeacherDetail] = useState({})

  const [selectedClient, setSelectedClient] = useState<User>({
    id: 0,
    username: '',
    password: '',
    userType: '',
    userTypeName: '',
    isActive: '',
    typeCode: '',
    createdAt: '',
    updatedAt: '',
    roles: [{ authority: '', id: 0, name: '' }]
  })

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))
  const numPages = Math.ceil(clients.length / perPage)
  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalPasswordActive, setIsModalPasswordActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [isModalDetailActive, setIsModalDetailActive] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const updatePassFormRef = useRef()

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
    setIsModalPasswordActive(false)
  }
  const handleUpdatePassModalAction = () => {
    if (updatePassFormRef.current) {
      updatePassFormRef.current.handleSubmit()
    }
  }
  const handleCloseDetailModal = () => {
    setTeacherDetail({})
    setIsModalDetailActive(false)
  }
  const passValidationSchema = Yup.object().shape({
    password: Yup.string().required('این فیلد اجباریست'),
    repassword: Yup.string().required('این فیلد اجباریست').oneOf([Yup.ref('password'), null], 'رمزها یکسان نیستند')
  })
  const handleDelModalAction = async () => {
    try {
      await iaxios.delete(API_SUB_BANK_LIST + "/" + selectedClient.id)
      setIsModalTrashActive(false)
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
      setTimeout(() => { window.location.reload() }, 1000)
    } catch (error) {
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
      console.log(error)
    }
  }
  const handleChangePass = async (values) => {
    try {
      await iaxios.put(API_USER_PASSWORD, {
        id: selectedClient.id,
        username: selectedClient.username,
        password: values.password,
      })
      handleModalAction()
      enqueueSnackbar('عملیات به روزرسانی با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
      console.log(error)
    }
  }
  return (
    <>
      <CardBoxModal
        title="حذف رکورد انتخاب شده"
        buttonColor="danger"
        buttonLabel="تایید"
        isActive={isModalTrashActive}
        onConfirm={handleDelModalAction}
        onCancel={handleModalAction}
      >
        <p>آیا از انجام عملیات مورد نظر اطمینان دارید؟</p>
      </CardBoxModal>

      <CardBoxModal
        title="ویرایش و مشاهده اطلاعات"
        buttonColor="warning"
        buttonLabel="ویرایش"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <BaseDivider />
        <Formik onSubmit={() => { }} initialValues={{ active: selectedClient.isActive === 'true' ? true : false, username: selectedClient.username, userType: selectedClient.userType }} >
          {({ values }) => (
            <Form className='text-sm whitespace-nowrap'>
              <FormField label='نام کاربری'>
                <Field name='username' />
                <FormField label='' >
                </FormField>
              </FormField>
              <FormField label='نوع کاربری'>
                <UserType name='userType' label='' />
              </FormField>

              <FormCheckRadioGroup>
                <FormCheckRadio type="radio" label="فعال" >
                  <Field type="radio" name="active" value="true" checked={values.active} />
                </FormCheckRadio>
                <FormCheckRadio type="radio" label="غیرفعال">
                  <Field type="radio" name="active" value="false" checked={!values.active} />
                </FormCheckRadio>
              </FormCheckRadioGroup>
            </Form>
          )}
        </Formik>
      </CardBoxModal>

      <CardBoxModal
        title="جزییات"
        buttonColor="info"
        buttonLabel="تایید"
        isActive={isModalDetailActive}
        onConfirm={handleCloseDetailModal}
        onCancel={handleCloseDetailModal}
        innerModalClassName='md:w-11/12'
      >
        <BaseDivider />
        <BaseDivider />
        <span className='font-bold text-blue-800'>بانکهای اطلاعات</span>
        <div className='bg-blue-200'>
          <table className='text-sm'>
            <thead>
              <tr className='[&>*]:text-right'>
                <th>عنوان</th>
                <th>زیر عنوان</th>
                <th>کد</th>
              </tr>
            </thead>
            <tbody>
              {teacherDetail?.bankhaList?.map(item =>
                <tr className='[&>*]:text-right'>
                  <td>{item.onvan}</td>
                  <td>{item.zir_onvan}</td>
                  <td>{item.id}</td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </CardBoxModal>
      {isLoading ? <Loading />
        :
        <table>
          <thead>
            <tr className='[&>*]:text-right [&>*]:whitespace-nowrap'>
              <th>عنوان بانک</th>
              <th>زیر بانک</th>
              <th>شرایط</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clientsPaginated.map((client) => (
              <tr key={client.id} className='[&>*]:text-right [&>*]:text-sm [&>*]:whitespace-nowrap'>
                <td data-label="">{client.bankOnvan}</td>
                <td data-label="">{client.zir_onvan}</td>
                <td data-label="">{client.sharayet ? client.sharayet : 'ندارد'}</td>
                <td className="before:hidden lg:w-1 whitespace-nowrap">
                  <BaseButtons type="justify-start lg:justify-between" noWrap>
                    <BaseButton
                      color="info"
                      icon={mdiEye}
                      onClick={() => { setIsModalInfoActive(true); setSelectedClient(client) }}
                      small
                    />
                    <BaseButton
                      color="danger"
                      icon={mdiTrashCan}
                      onClick={() => { setIsModalTrashActive(true); setSelectedClient(client) }}
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
