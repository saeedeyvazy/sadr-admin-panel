import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { User } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import { Loading } from './Loading'
import { API_ORGANIZATION_LIST } from '../constants'
import BaseDivider from './BaseDivider'
import { iaxios } from '../config'
import { Field, Form, Formik } from 'formik'
import FormField from './FormField'
import { useSnackbar } from 'notistack'

export const UserTable = ({ clients, isLoading, error }) => {

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
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [isModalDetailActive, setIsModalDetailActive] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const handleCloseDetailModal = () => {
    setTeacherDetail({})
    setIsModalDetailActive(false)
  }

  const handleDelModalAction = async () => {
    try {
      await iaxios.delete(API_ORGANIZATION_LIST + "/" + selectedClient.id)
      setIsModalTrashActive(false)
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
      console.log(error)
    }
  }

  return (
    <>
      <CardBoxModal
        title="حذف اداره"
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
        <Formik onSubmit={() => { }} initialValues={{ shahrestan: selectedClient.shahrestan, name_karshenas: selectedClient.name_karshenas, onvan_karshenas: selectedClient.onvan_karshenas, onvan_raiis: selectedClient.onvan_raiis, name_raiis: selectedClient.name_raiis }} >
          <Form className='text-sm whitespace-nowrap'>
            <FormField label='شهرستان'>
              <Field name='shahrestan' />
              <FormField label='' >
              </FormField>
            </FormField>
            <FormField label='نام مسئول'>
              <Field name='name_raiis' ></Field>
            </FormField>
            <FormField label='عنوان کارشناس'>
              <Field name='onvan_karshenas' />
            </FormField>
            <FormField label='نام کارشناس'>
              <Field name='name_karshenas' />
            </FormField>
            <FormField label='عنوان مسئول'>
              <Field name='onvan_raiis' ></Field>
            </FormField>
          </Form>

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
              <th>نام کاربری</th>
              <th>نوع کاربری</th>
              <th>نقش ها</th>
              <th>فعال</th>
              <th>تاریخ ایجاد</th>
              <th>تاریخ آخرین به روزرسانی</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clientsPaginated.map((client: User) => (
              <tr key={client.id} className='[&>*]:text-right [&>*]:text-sm [&>*]:whitespace-nowrap'>
                <td data-label="">{client.username}</td>
                <td data-label="">{client.userTypeName}</td>
                <td className='grid grid-cols-1'>
                  {client?.roles?.map(item => <span>{item.name}</span>)}
                </td>
                <td data-label="" className="lg:w-32">{client.isActive === 'true' ? 'هست' : 'نیست'}</td>
                <td>{client?.createdAt?.split('T')[0]}</td>
                <td>{client?.updatedAt?.split('T')[0]}</td>
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