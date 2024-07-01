import { mdiCardAccountDetails, mdiEye, mdiTrashCan } from '@mdi/js'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { iaxios } from '../config'
import { API_PERSON_ACADEMIC_INFO, API_REPAIR } from '../constants'
import { selectedSubBank } from '../features/subbank/subbank.slice'
import { Bank } from './Bank/index'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import BaseDivider from './BaseDivider'
import CardBoxModal from './CardBoxModal'
import { Loading } from './Loading'
import { SubBank } from './SubBank/index'

export const PersonAcademicTable = ({ clients, isLoading, error }) => {

  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)
  const [teacherDetail, setTeacherDetail] = useState({})

  const [selectedClient, setSelectedClient] = useState({
    id: 0,
    fname: '',
    lname: '',
    jensiyatName: '',
    codemelli: '',
    mob: '',
    taholName: '',
    address: '',
    pic: '',
    mahalsodor: '',
    ttmoalem: '',
    tkmelli: ''
  })

  const clientsPaginated = clients?.slice(perPage * currentPage, perPage * (currentPage + 1))
  const numPages = Math.ceil(clients?.length / perPage)
  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [isModalDetailActive, setIsModalDetailActive] = useState(false)

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const selectSubbank = useSelector(selectedSubBank)

  const handleSubmit = async () => {
    try {
      await iaxios.post(API_REPAIR, { id_anavin: selectSubbank, codemelli_person: selectedClient.codemelli })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
    finally {
      setIsModalInfoActive(false)
      setIsModalDetailActive(false)
    }
  }

  const deleteBank = async (bankId) => {
    try {
      await iaxios.delete(API_PERSON_ACADEMIC_INFO + `/${bankId}`)
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
    finally {
      setIsModalInfoActive(false)
      setIsModalDetailActive(false)
    }
  }

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
      await iaxios.delete(API_PERSON_ACADEMIC_INFO + "/" + selectedClient.id)
      setIsModalTrashActive(false)

    } catch (error) {
      console.log(error)
    }
  }

  async function fetchDetail(id) {
    try {
      const response = await axios.get(API_PERSON_ACADEMIC_INFO + "/" + id)
      setTeacherDetail(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CardBoxModal
        title="جزییات"
        buttonColor="info"
        buttonLabel="تایید"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <div className='flex justify-around items-center'>
          <img src={`data:image/jpeg;base64,${selectedClient.pic}`} alt='' className='w-14 h-14' />
          <img src={`data:image/jpeg;base64,${selectedClient.tkmelli}`} alt='' className='w-14 h-14' />
          <img src={`data:image/jpeg;base64,${selectedClient.ttmoalem}`} alt='' className='w-14 h-14' />
        </div>
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
                <th />
              </tr>
            </thead>
            <tbody>
              {teacherDetail?.bankhaList?.map((item, index) =>
                <tr key={index} className='[&>*]:text-right'>
                  <td>{item.onvan}</td>
                  <td>{item.zir_onvan}</td>
                  <td>{item.id}</td>
                  <td className='flex items-center justify-center'><BaseButton type="button" onClick={() => deleteBank(item.id)} color="danger" label="حذف" /></td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
        <Formik
          initialValues={{
            bank: '',
            subbank: ''
          }}
          onSubmit={(values) => { handleSubmit(values) }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="bg-gray-200 p-4">
                <Bank onchange={setFieldValue} />
                <SubBank onchange={setFieldValue} />
                <BaseButton type="button" onClick={() => handleSubmit()} color="info" label="سازماندهی" />
              </div>
            </Form>)}
        </Formik>
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
              {teacherDetail?.sabeqeList?.map((item, index) =>
                <tr key={index} className='[&>*]:text-right'>
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
              {teacherDetail?.madrakList?.map((item, index) =>
                <tr key={index} className='[&>*]:text-right'>
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
              {teacherDetail?.eshteghalList?.map((item, index) =>
                <tr key={index} className='[&>*]:text-right'>
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
              {teacherDetail?.tahsiliList?.map((item, index) =>
                <tr key={index} className='[&>*]:text-right'>
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

      </CardBoxModal >

      <CardBoxModal
        title="حذف اطلاعات تحصیلی"
        buttonColor="danger"
        buttonLabel="تایید"
        isActive={isModalTrashActive}
        onConfirm={handleDelModalAction}
        onCancel={handleModalAction}
      >
        <p>آیا از انجام عملیات مورد نظر اطمینان دارید؟</p>
      </CardBoxModal>
      {
        isLoading ? <Loading />
          :
          <table>
            <thead>
              <tr className='[&>*]:text-right'>
                <th />
                <th>مقطع</th>
                <th>رشته تحصیلی</th>
                <th>معدل</th>
                <th>سال اخذ</th>
                <th>کد استاد</th>
                <th>تصویر</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clientsPaginated.map((client) => (
                <tr key={client.id} className='[&>*]:text-right'>
                  <td className="border-b-0 lg:w-6 before:hidden">

                  </td>
                  <td data-label="   ">{`${client.maghta}`}</td>
                  <td data-label="کد ملی" className='text-sm'>{client.reshte}</td>
                  <td data-label="جنسیت" className='text-sm'>{client.moadel}</td>
                  <td data-label="محل صدور" className="text-sm">{client.sal_akhz}</td>
                  <td data-label="شماره همراه" className="text-sm">{client.id_teacher}</td>
                  <td data-label="شماره همراه" className="nowrap text-sm">
                    {client.tasvir ? <img
                      src={`data:image/png;base64,${client.tasvir}`}
                      className="rounded-smshadow-lg block  w-full bg-gray-100 h-full dark:bg-slate-800"
                    /> : 'ندارد'}


                  </td>

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
                      <BaseButton
                        color="info"
                        icon={mdiCardAccountDetails}
                        className='mr-3'
                        onClick={() => { fetchDetail(client.id); setIsModalDetailActive(true) }}
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
