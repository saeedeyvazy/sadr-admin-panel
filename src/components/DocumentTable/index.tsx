import { mdiEye } from '@mdi/js'
import React, { useState } from 'react'
import { Document, Teacher } from '../../interfaces'
import BaseButton from '../BaseButton'
import BaseButtons from '../BaseButtons'
import CardBoxModal from '../CardBoxModal'
import { Loading } from '../Loading'
import axios from 'axios'
import { API_GENERAL_TEACHER_SEARCH, API_UPPDATE_DOCUNENT } from '../../constants'
import BaseDivider from '../BaseDivider'
import { iaxios } from '../../config'
import { useSnackbar } from 'notistack'

export const DocumentTable = ({ clients, isLoading, error }) => {

  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)
  const [teacherDetail, setTeacherDetail] = useState({})

  const [selectedClient, setSelectedDocument] = useState<Document>({
    id: 0,
    saat: "",
    moadel: "",
    sal_akhz: "",
    codemelli: "",
    vaziat: 0,
    tozih: "",
    onvan_dore: "",
    pic: "",
    mahal_dore: "",
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
      confirmDoc(selectedClient.id, 3)
      setIsModalTrashActive(false)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  async function fetchDetail(id) {
    try {
      const response = await axios.get(API_GENERAL_TEACHER_SEARCH + "/" + id)
      setTeacherDetail(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function confirmDoc(id, status) {
    try {
      await iaxios.put(API_UPPDATE_DOCUNENT, {
        id,
        vaziat: status
      })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
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
      </CardBoxModal>

      <CardBoxModal
        title="عدم تایید مدرک"
        buttonColor="danger"
        buttonLabel="تایید"
        isActive={isModalTrashActive}
        onConfirm={handleDelModalAction}
        onCancel={handleModalAction}
      >
        <p>آیا از انجام عملیات مورد نظر اطمینان دارید؟</p>
      </CardBoxModal>
      {isLoading ? <Loading />
        :
        <table>
          <thead>
            <tr className='[&>*]:text-right'>
              <th>نام ارگان</th>
              <th>عنوان دوره</th>
              <th>نام و نام خانوادگی</th>
              <th>کد ملی</th>
              <th>تصویر فرد</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clientsPaginated.map((client: Document) => (
              <tr key={client.id} className='[&>*]:text-right'>
                <td data-label="نام و نام خانوادگی">{client.name_organ}</td>
                <td data-label="کد ملی" className='text-sm'>{client.onvan_dore}</td>
                <td data-label="جنسیت">{`${client.fname} ${client.lname}`}</td>
                <td data-label="محل صدور" className="lg:w-32">{client.codemelli}</td>
                <td data-label="شماره همراه" className="lg:w-1 whitespace-nowrap text-sm">
                  <img src={`data:image/jpeg;base64,${client.codemelli_pic}`} alt='' className='w-14 h-14' />
                </td>
                <td className="before:hidden lg:w-1 whitespace-nowrap">
                  <BaseButtons type="justify-start lg:justify-between" noWrap>
                    <BaseButton
                      color="info"
                      icon={mdiEye}
                      onClick={() => { setIsModalDetailActive(true); setSelectedDocument(client); fetchDetail(client.id) }}
                      small
                    />
                    <BaseButton
                      color="danger"
                      onClick={() => { setIsModalTrashActive(true); setSelectedDocument(client) }}
                      small
                      label='عدم تایید'
                    />
                    <BaseButton
                      color="info"
                      label='تایید'
                      className='mr-3'
                      onClick={() => { confirmDoc(client.id, 1) }}
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
