import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { Organization, Teacher } from '../interfaces'
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

export const OrganizationTable = ({ clients, isLoading, error }) => {

  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)
  const [teacherDetail, setTeacherDetail] = useState({})

  const [selectedClient, setSelectedClient] = useState<Organization>({
    id_organ: 0,
    shahrestan: '',
    onvan_raiis: '',
    name_raiis: '',
    onvan_karshenas: '',
    name_karshenas: '',
    id: 0
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
        <BaseDivider />
        <BaseDivider />
        <span className='font-bold text-blue-800'>سابقه تدریس</span>
        <div className='bg-blue-200'>
          <table className='text-sm'>
            <thead>
              <tr className='[&>*]:text-right'>
                <th>عنوان</th>
                <th>عنوان دوره</th>
                <th>نام دوره</th>
                <th>تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {teacherDetail?.sabeqeList?.map(item =>
                <tr className='[&>*]:text-right'>
                  <td>{item.onvan}</td>
                  <td>{item.onvan_dore}</td>
                  <td>{item.nam}</td>
                  <td>{`${item.tshs}/${item.tshm}/${item.tshr}`}</td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
        <BaseDivider />
        <BaseDivider />
        <span className='font-bold text-blue-800'>مدارک تخصصی</span>
        <div className='bg-blue-200'>
          <table className='text-sm'>
            <thead>
              <tr className='[&>*]:text-right'>
                <th>عنوان دوره</th>
                <th>ساعت آموزشی</th>
                <th>معدل</th>
                <th>سال اخذ</th>
                <th>محل دوره</th>
                <th>توضیحات</th>
              </tr>
            </thead>
            <tbody>
              {teacherDetail?.madrakList?.map(item =>
                <tr className='[&>*]:text-right'>
                  <td className='whitespace-nowrap'>{item.onvan_dore}</td>
                  <td>{item.saat}</td>
                  <td>{item.moadel}</td>
                  <td>{item.sal_akhz}</td>
                  <td>{item.mahal_dore}</td>
                  <td>
                    {item.pic ? <img src={`data:image/jpeg;base64,${item.pic}`} alt='' className='w-24 h-24' /> : 'تصویر ندارد'}
                  </td>
                </tr>)
              }
            </tbody>
          </table>
        </div>

        <BaseDivider />
        <BaseDivider />
        <span className='font-bold text-blue-800'>وضعیت شغلی</span>
        <div className='bg-blue-200'>
          <table className='text-sm'>
            <thead>
              <tr className='[&>*]:text-right'>
                <th>نوع شغل</th>
                <th>نوع قرارداد</th>
                <th>محل کار</th>
                <th>تلفن</th>
              </tr>
            </thead>
            <tbody>
              {teacherDetail?.eshteghalList?.map(item =>
                <tr className='[&>*]:text-right'>
                  <td>{item.noshoghl}</td>
                  <td>{item.nogharardad}</td>
                  <td>{item.mahalkar}</td>
                  <td>{item.tell}</td>
                </tr>)
              }
            </tbody>
          </table>
        </div>

        <BaseDivider />
        <BaseDivider />
        <span className='font-bold text-blue-800'>وضعیت تحصیلی</span>
        <div className='bg-blue-200'>
          <table className='text-sm'>
            <thead>
              <tr className='[&>*]:text-right'>
                <th>مقطع</th>
                <th>رشته</th>
                <th>معدل</th>
                <th>سال اخذ</th>
                <th>تصویر</th>
              </tr>
            </thead>
            <tbody>
              {teacherDetail?.tahsiliList?.map(item =>
                <tr className='[&>*]:text-right'>
                  <td>{item.maghta}</td>
                  <td>{item.reshte}</td>
                  <td>{item.moadel}</td>
                  <td>{item.sal_akhz}</td>
                  <td>
                    {item.tasvir ? <img src={`data:image/jpeg;base64,${item.tasvir}`} alt='' className='w-24 h-24' /> : 'تصویر ندارد'}
                  </td>
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
              <th>عنوان مسئول</th>
              <th>نام مسئول</th>
              <th>عنوان کارشناس</th>
              <th>نام کارشناس</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clientsPaginated.map((client: Organization) => (
              <tr key={client.id} className='[&>*]:text-right [&>*]:text-sm [&>*]:whitespace-nowrap'>
                <td data-label="کد ملی">{client.onvan_raiis}</td>
                <td data-label="جنسیت">{client.name_raiis}</td>
                <td data-label="محل صدور" className="lg:w-32">{client.onvan_karshenas}</td>
                <td data-label="شماره همراه" className="lg:w-1 whitespace-nowrap text-sm">{client.name_karshenas}</td>
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
