import { mdiCardAccountDetails, mdiEye, mdiTrashCan, mdiUpdate } from '@mdi/js'
import React, { useRef, useState } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import { Loading } from './Loading'
import { API_CLASS_INFO, API_CLASS_STUDENT_INFO, API_SUPPORT_SEARCH, API_UPDATE_CLASS_MOASSESE, API_UPDATE_CLASS_ONVAN_DORE } from '../constants'
import BaseDivider from './BaseDivider'
import { iaxios } from '../config'
import { Field, Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import FormField from './FormField'
import { DoreSelect } from './DoreSelect'
import { UserOffice } from './UserOffice'
import { Mkh } from './Mkh'
import { Organ } from './Organ/Organ'
import { DatePicker } from 'react-advance-jalaali-datepicker'
export const SupportTable = ({ clients, isLoading, error }) => {

  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)
  const [teacherDetail, setTeacherDetail] = useState()
  const [classInfo, setClassInfo] = useState()
  const [expDate, setExpDate] = useState(null)

  const [selectedClient, setSelectedClient] = useState({
    id: 0,
    onvan_dore: '',
    id_dore: '',
    id_organ: '',
    name_organ: '',
    onvan_emza: '',
    post_emza: '',
    mohlat_s: 0,
    mohlat_m: 0,
    mohlat_r: 0,
    zarfiat: 0,
    baqimande: 0,
    faal: false,
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

  const handleSubmitOnvanDore = async (values) => {
    try {
      const [mohlat_s, mohlat_m, mohlat_r] = values.exp_date.split("/")
      // console.log({ ...values, mohlat_s: +mohlat_s, mohlat_m: +mohlat_m, mohlat_r: +mohlat_r, id_organ: values.organ, baqimande: selectedClient.baqimande, faal: true, id: selectedClient.id })

      await iaxios.put(API_SUPPORT_SEARCH, { ...values, mohlat_s: +mohlat_s, mohlat_m: +mohlat_m, mohlat_r: +mohlat_r, id_organ: values.organ, baqimande: selectedClient.baqimande, faal: true, id: selectedClient.id })

      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      console.log(error)
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
    finally {
      setIsModalInfoActive(false)
      setIsModalDetailActive(false)
    }
  }
  const handleSubmitMoassese = async (values) => {
    try {

      await iaxios.put(API_UPDATE_CLASS_MOASSESE, { codek: selectedClient.codek, codemoassese: values.codemoassese, codequran: values.mkh })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      console.log(error)
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
    finally {
      setIsModalInfoActive(false)
      setIsModalDetailActive(false)
    }
  }

  const handleModalAction = () => {
    if (updatePassFormRef.current) {
      updatePassFormRef.current.handleSubmit()
    }
    handleCancelModalAction()
  }

  const handleMoasseseModalAction = () => {
    if (updateMoasseseFormRef.current) {
      updateMoasseseFormRef.current.handleSubmit()
    }
    handleCancelModalAction()
  }
  const handleCancelModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const handleDelModalAction = async () => {
    try {
      await iaxios.delete(API_SUPPORT_SEARCH + "/" + selectedClient.id)
      setIsModalTrashActive(false)
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
      console.log(error)
    }
  }

  const updatePassFormRef = useRef()
  const updateMoasseseFormRef = useRef()

  async function fetchDetail(id) {
    try {
      const response = await iaxios.get(API_CLASS_STUDENT_INFO + "?codek=" + id)
      const classInfoResponse = await iaxios.get(API_CLASS_INFO, { params: { codek: id } })
      setTeacherDetail(response.data.data)
      console.group(classInfoResponse.data.data)
      setClassInfo(classInfoResponse.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CardBoxModal
        title="حذف دوره حمایتی"
        buttonColor="danger"
        buttonLabel="تایید"
        isActive={isModalTrashActive}
        onConfirm={handleDelModalAction}
        onCancel={handleModalAction}
      >
        <p>آیا از انجام عملیات مورد نظر اطمینان دارید؟</p>
      </CardBoxModal>
      <CardBoxModal
        title="جزییات"
        buttonColor="info"
        buttonLabel="تایید"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleCancelModalAction}
      >
        <Formik
          initialValues={{
            onvan_dore: selectedClient.onvan_dore,
            onvan_emza: selectedClient.onvan_emza,
            post_emza: selectedClient.post_emza,
            zarfiat: selectedClient.zarfiat,
            organ: 0,
            id_dore: 0,
            exp_date: ''
          }}
          onSubmit={handleSubmitOnvanDore}
          innerRef={updatePassFormRef}
        >
          {({ values, setFieldValue }) => (
            <Form className="md:min-w-[300px] md:min-h-[300px]" >
              <FormField label="" >
                <FormField label="عنوان دوره" >
                  <DoreSelect isMulti={false} name="id_dore" signal={(selected) => { setFieldValue('id_dore', selected.value.id) }} />
                </FormField>
                <FormField>
                  <Organ setFieldValue={setFieldValue} />
                </FormField>
              </FormField>
              <FormField label="سمت امضا کننده">
                <Field name="onvan_emza" placeholder="" />
              </FormField>
              <FormField label="نام امضا کننده">
                <Field name="post_emza" placeholder="" />
              </FormField>

              <FormField label="ظرفیت حمایتی">
                <Field name="zarfiat" placeholder="" />
              </FormField>
              <FormField>

                <DatePicker
                  inputComponent={(props) => <Field name='exp_date' className="popo" {...props} />}
                  placeholder="انتخاب تاریخ"
                  format="jYYYY/jMM/jDD"
                  onChange={(unix, formatted) => setFieldValue("exp_date", formatted)}
                  id="datePicker"
                  preSelected="1396/05/15"
                  name='exp_date'
                />
              </FormField>
            </Form >)
          }
        </Formik >
      </CardBoxModal >


      <CardBoxModal
        title="به روزرسانی موسسه"
        buttonColor="info"
        buttonLabel="تایید"
        onConfirm={handleMoasseseModalAction}
        onCancel={handleCancelModalAction}
      >
        <Formik
          initialValues={{
            codemoassese: selectedClient.name,
            mkh: ''
          }}
          onSubmit={handleSubmitMoassese}
          innerRef={updateMoasseseFormRef}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <FormField label="" >
                <FormField label="نوع" >
                  <Mkh name='mkh' />
                </FormField>
                <UserOffice name='codemoassese' label='موسسه' />
              </FormField>
            </Form >)
          }
        </Formik >
      </CardBoxModal>
      {
        isLoading ? <Loading />
          :
          <table>
            <thead>
              <tr className='[&>*]:text-right'>
                <th>ارگان</th>
                <th>عنوان دوره</th>
                <th>نام امضا کننده</th>
                <th>سمت امضا کننده</th>
                <th>تاریخ مهلت</th>
                <th>ظرفیت</th>
                <th>باقیمانده</th>
              </tr>
            </thead>
            <tbody>
              {clientsPaginated.map((client) => (
                <tr key={client.id} className='[&>*]:text-right'>
                  <td data-label="کد کلاس">{client.name_organ}</td>
                  <td data-label="نام موسسه">{client.onvan_dore}</td>
                  <td data-label="کد مربی" className="lg:w-32">{client.post_emza}</td>
                  <td data-label="کد قرآن" className='text-sm'>{client.onvan_emza}</td>
                  <td data-label="نام مربی" className="">{`${client.mohlat_s}/${client.mohlat_m}/${client.mohlat_r}`}</td>
                  <td>{client.zarfiat}</td>
                  <td>{client.baqimande}</td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons type="justify-start lg:justify-between" noWrap>
                      <BaseButton
                        color="info"
                        icon={mdiEye}
                        onClick={() => { setIsModalInfoActive(true); setSelectedClient(client) }}
                        small
                      />
                      <BaseButton
                        color="info"
                        icon={mdiCardAccountDetails}
                        onClick={() => { fetchDetail(client.codek); setIsModalDetailActive(true) }}
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
