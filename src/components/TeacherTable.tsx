import { mdiCardAccountDetails, mdiDetails, mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { Teacher } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
import { Loading } from './Loading'
import { Accordion } from "./Accordion"
import axios from 'axios'
import { API_GENERAL_TEACHER_SEARCH } from '../constants'
import SectionTitleLineWithButton from './SectionTitleLineWithButton'
import BaseDivider from './BaseDivider'

export const TeacherTable = ({ clients, isLoading, error }) => {

  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)
  const [teacherDetail, setTeacherDetail] = useState({})

  const [selectedClient, setSelectedClient] = useState<Teacher>({
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

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))
  const numPages = clients.length / perPage
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

  async function fetchDetail(id) {
    try {
      const response = await axios.get(API_GENERAL_TEACHER_SEARCH + "/" + id)
      console.log(response)
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

      <CardBoxModal
        title="تایید درخواست"
        buttonColor="danger"
        buttonLabel="تایید"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>آیا از انجام عملیات مورد نظراطمینان دارید؟</p>
      </CardBoxModal>
      {isLoading ? <Loading />
        :
        <table>
          <thead>
            <tr className='[&>*]:text-right'>
              <th />
              <th>نام و نام خانوادگی</th>
              <th>کد ملی</th>
              <th>جنسیت</th>
              <th>محل صدور</th>
              <th>شماره همراه</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clientsPaginated.map((client: Teacher) => (
              <tr key={client.id} className='[&>*]:text-right'>
                <td className="border-b-0 lg:w-6 before:hidden">
                  <UserAvatar username={''} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                </td>
                <td data-label="نام و نام خانوادگی">{`${client.fname} ${client.lname}`}</td>
                <td data-label="کد ملی" className='text-sm'>{client.codemelli}</td>
                <td data-label="جنسیت">{client.jensiyatName}</td>
                <td data-label="محل صدور" className="lg:w-32">{client.mahalsodor}</td>
                <td data-label="شماره همراه" className="lg:w-1 whitespace-nowrap text-sm">{client.mob}</td>
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
                      onClick={() => setIsModalTrashActive(true)}
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
                {/* <td>
                  <Accordion onClick={() => fetchDetail(client.id)} id={client.id} title='Accordion'>
                    {teacherDetail?.bankhaList?.map(item => <div>
                      <span>{`${item.onvan} - ${item.zir_onvan}`}</span>
                    </div>)}
                  </Accordion>
                </td> */}
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
