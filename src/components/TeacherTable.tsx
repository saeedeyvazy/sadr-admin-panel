import { mdiEye, mdiTrashCan, mdiLoading } from '@mdi/js'

import React, { useState } from 'react'
import { Teacher } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
import { useTeacher } from '../hooks/useTeacher'
import BaseIcon from './BaseIcon'
import { Loading } from './Loading'
import Image from 'next/image'

export const TeacherTable = () => {
  const { data, error, isLoading } = useTeacher()
  const clients = data
  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)

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
    mahalsodor: ''
  })

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))
  const numPages = clients.length / perPage
  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
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
        <img src={`data:image/jpeg;base64,${selectedClient.pic}`} alt='' className='w-12 h-12' />
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
                  <BaseButtons type="justify-start lg:justify-end" noWrap>
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
