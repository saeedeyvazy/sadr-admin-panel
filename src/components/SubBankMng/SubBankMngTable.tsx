import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useRef, useState } from 'react'
import BaseButton from '../BaseButton'
import BaseButtons from '../BaseButtons'
import CardBoxModal from '../CardBoxModal'
import { Loading } from '../Loading'
import { API_SUB_BANK_LIST } from '../../constants'
import BaseDivider from '../BaseDivider'
import { iaxios } from '../../config'
import { Field, Form, Formik } from 'formik'
import FormField from '../FormField'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import { Bank } from '../Bank'
import { useSelector } from 'react-redux'
import { selectedBankName } from '../../features/bank/bank.slice'

export const SubBankMngTable = ({ clients, isLoading, error }) => {

  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)

  const [selectedClient, setSelectedClient] = useState({})

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))
  const numPages = Math.ceil(clients.length / perPage)
  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalPasswordActive, setIsModalPasswordActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const formRef = useRef()
  const bankOnvan = useSelector(selectedBankName)
  const handleModalAction = () => {

    if (formRef.current) {
      formRef.current.handleSubmit()
    }
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
    setIsModalPasswordActive(false)
  }

  const editZirBank = async (values) => {
    try {
      const { jayegah, zir_onvan, sharayet } = values
      console.log({ id: selectedClient.id, jayegah, zir_onvan, sharayet, bankOnvan, id_bank: values.bank })
      await iaxios.put(API_SUB_BANK_LIST, { id: selectedClient.id, jayegah, zir_onvan, sharayet, bankOnvan, id_bank: values.bank })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
      setTimeout(() => { window.location.reload() }, 1000)
    } catch (error) {
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
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
        <Formik innerRef={formRef} onSubmit={editZirBank} initialValues={{ zir_onvan: '', bank: selectedClient.bank, subbank: selectedClient.subbank, sharayet: selectedClient.sharayet, jayegah: '' }} >
          {({ values, setFieldValue }) => (
            <Form className='text-sm whitespace-nowrap'>
              <FormField label=''>
                <Bank onchange={setFieldValue} />
                <FormField label="جایگاه" >
                  <Field component='select' name="jayegah" placeholder="" >
                    {Array.from({ length: 100 }, (_, i) => i + 1).map(item => <option style={{ textAlign: 'center' }} value={item}>{item}</option>)}
                  </Field>
                </FormField>
              </FormField>
              <FormField label="شرایط سطح" >
                <Field name="sharayet" placeholder="" />
              </FormField>
              <FormField label="" >
                <FormField label="عنوان سطح" >
                  <Field name="zir_onvan" placeholder="" />
                </FormField>
              </FormField>
            </Form>
          )}
        </Formik>
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
