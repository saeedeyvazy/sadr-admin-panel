import { labels } from '@/constants/labels'
import { mdiCardAccountDetails, mdiEye, mdiUpdate } from '@mdi/js'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useRef, useState } from 'react'
import { iaxios } from '../config'
import { API_CLASS_INFO, API_FOUNDATION_LIST, API_INST_CERT_LIST, API_INST_PRINT_CERT, API_UPDATE_ASSOSIATION_STATE, API_UPDATE_CLASS_MOASSESE, API_UPDATE_CLASS_ONVAN_DORE } from '../constants'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import BaseDivider from './BaseDivider'
import CardBoxModal from './CardBoxModal'
import { DoreSelect } from './DoreSelect'
import FormField from './FormField'
import { Loading } from './Loading'
import { Mkh } from './Mkh'
import { UserOffice } from './UserOffice'
import SectionTitleLineWithButton from './SectionTitleLineWithButton'
import { AssosiationStatus } from './AssosiationStatus/AssosiationStatus'
export const FoundationReportTable = ({ clients, isLoading, error }) => {

  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)
  const [teacherDetail, setTeacherDetail] = useState()
  const [classInfo, setClassInfo] = useState()

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
    tkmelli: '',

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
  const [isModalTest, setIsModalTest] = useState(false)
  const [certList, setCertList] = useState([{}])

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const handleSubmitOnvanDore = async (values) => {
    try {

      await iaxios.put(API_UPDATE_CLASS_ONVAN_DORE, { codek: selectedClient.codek, onvan: classInfo.onvan_dore })
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

      await iaxios.put(API_UPDATE_ASSOSIATION_STATE, { code: selectedClient.id, vaziat: values.newStatus })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })
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
    setIsModalTest(false)
  }

  const handleCloseDetailModal = () => {
    setTeacherDetail()
    setClassInfo()
    setIsModalDetailActive(false)
  }
  const updatePassFormRef = useRef()
  const updateMoasseseFormRef = useRef()

  async function fetchDetail(id) {
    try {
      const response = await iaxios.get(API_FOUNDATION_LIST + "/" + id)
      const classInfoResponse = await iaxios.get(API_FOUNDATION_LIST + "/" + id)
      setTeacherDetail(response.data.data)

      setClassInfo(classInfoResponse.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchCertificateList(nationalCode) {
    try {

      const response = await iaxios.get(API_INST_CERT_LIST
        .replace('{nationalCode}', nationalCode)
        .replace('{classCode}', selectedClient.codek)
      )
      setCertList(response.data.data)
    } catch (error) {
      alert(error)
    }
  }
  const router = useRouter()
  async function generateCertificate(nationalCode) {
    try {
      const response = await iaxios.get(API_INST_PRINT_CERT
        .replace('{nationalCode}', nationalCode)
        .replace('{classCode}', selectedClient.codek)
      )
      const responseData = response.data.data
      router.push({
        pathname: "/institution/cert-print",
        query: {
          title: responseData.onvan_govahi, subtitle: responseData.gerayesh,
          flname: responseData.flname,
          fthname: responseData.fthname,
          nationalCode,
          startDate: responseData.tsh,
          endDate: responseData.tp,
          province: responseData.ostan,
          town: responseData.shahrestan,
          officeTitle: responseData.onvan,
          officeName: responseData.name,
          hours: responseData.saat,
          score: responseData.nahaii,
          fname: responseData.fname,
          lname: responseData.lname,
          birthDate: responseData.ts,
          pic: responseData.pic

        }
      })
    } catch (error) {
      alert(error)
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
        onCancel={handleCancelModalAction}
      >
        <Formik
          initialValues={{
            name: selectedClient.name,
            onvan_dore: selectedClient.onvan_dore
          }}
          onSubmit={handleSubmitOnvanDore}
          innerRef={updatePassFormRef}
        >
          {({ values, setFieldValue }) => (
            <Form className="md:min-w-[300px] md:min-h-[300px]" >
              <FormField label="" >
                <FormField label="عنوان دوره" >
                  <DoreSelect isMulti={true} name="onvan_dore" signal={(selected) => { setFieldValue('onvan_dore', selected[0]?.value) }} />
                </FormField>
              </FormField>
            </Form >)
          }
        </Formik >
      </CardBoxModal >
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
        <span className='font-bold text-blue-800'>جزییات موسسه / خانه قرآنی</span>
        <div className='bg-blue-200'>
          <table className='text-sm'>
            <thead>
              <tr className='[&>*]:text-right'>
                <th>آرم موسسه</th>
                <th>نام</th>
                <th>شماره ثبت</th>
                <th>شماره پروانه</th>
                <th>فاکس</th>
                <th>استان</th>
                <th>کد پستی</th>
              </tr>
            </thead>
            <tbody>
              <tr className='[&>*]:text-right'>
                <td>
                  {classInfo?.logo ? <img src={`data:image/jpeg;base64,${classInfo.logo}`} alt='' className='w-24 h-24' /> : 'تصویر ندارد'}
                </td>
                <td>{classInfo?.nam}</td>
                <td>{classInfo?.shs}</td>
                <td>{classInfo?.sh_p}</td>
                <td>{classInfo?.fax}</td>
                <td>{classInfo?.ostan}</td>
                <td>{classInfo?.codeposti}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <SectionTitleLineWithButton icon={null} title='تصاویر مربوطه' main></SectionTitleLineWithButton>
        <BaseDivider />
        <div className='grid grid-cols-5 w-full'>
          <div className="grid grid-cols-1 text-center gap-y-4">
            <span className='font-bold'>آرم موسسه</span>
            {classInfo?.logo ?
              <img
                alt="test"
                src={`data:image/png;base64,${classInfo?.logo}`}
                className="rounded-sm shadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
              />
              : 'تصویر ندارد'}
          </div>
          <div className="grid grid-cols-1 text-center gap-y-4">
            <span className='font-bold'>روزنامه رسمی</span>
            {classInfo?.rozname_rasmi ?
              <img
                src={`data:image/png;base64,${classInfo?.rozname_rasmi}`}
                className="rounded-smshadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
              /> : 'تصویر ندارد'
            }
          </div>
          <div className="grid grid-cols-1 text-center gap-y-4">
            <span className='font-bold'>روزنامه محلی</span>
            {classInfo?.rozname_mahali ?
              < img
                src={`data:image/png;base64,${classInfo?.rozname_mahali}`}
                className="rounded-smshadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
              /> : 'تصویر ندارد'}
          </div>
          <div className="grid grid-cols-1 text-center gap-y-4">
            <span className='font-bold'>آگهی تاسیس</span>
            {classInfo?.agahi_tasis ?
              <img
                src={`data:image/png;base64,${classInfo?.agahi_tasis}`}
                className="rounded-smshadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
              /> : 'تصویر ندارد'}
          </div>
          <div className="grid grid-cols-1 text-center gap-y-4">
            <span className='font-bold'>پروانه فعالیت</span>
            {classInfo?.parvane_faaliat ?
              <img
                src={`data:image/png;base64,${classInfo?.parvane_faaliat}`}
                className="rounded-smshadow-lg block  max-w-full bg-gray-100 dark:bg-slate-800"
              /> : 'تصویر ندارد'}
          </div>
        </div>
        <BaseDivider />
        <BaseDivider />
        <span className='font-bold text-blue-800'>اطلاعات آدرس</span>
        <div className='bg-blue-200'>
          <table className='text-sm'>
            <thead>
              <tr className='[&>*]:text-right'>
                <th>آدرس دقیق</th>
              </tr>
            </thead>
            <tbody>
              <tr className='[&>*]:text-right'>
                <td>{classInfo?.daqiq}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <BaseDivider />
        <BaseDivider />
      </CardBoxModal >

      <CardBoxModal
        title="به روزرسانی موسسه"
        buttonColor="info"
        buttonLabel="تایید"
        isActive={isModalTest}
        onConfirm={handleCancelModalAction}
        onCancel={handleCancelModalAction}
      >
        <table>
          <thead>
            <tr className='[&>*]:text-right'>
              <th>کد کلاس</th>
              <th>نام موسسه</th>
              <th>عنوان دوره</th>
              <th>کد مربی</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {
              certList.map((item, index) =>
              (<tr key={index}>
                <td>{item}</td>
              </tr>))
            }
          </tbody>
        </table>
      </CardBoxModal>
      <CardBoxModal
        title="به روزرسانی"
        buttonColor="info"
        buttonLabel="تایید"
        isActive={isModalTrashActive}
        onConfirm={handleMoasseseModalAction}
        onCancel={handleCancelModalAction}
      >
        <Formik
          initialValues={{
            newStatus: ''
          }}
          onSubmit={handleSubmitMoassese}
          innerRef={updateMoasseseFormRef}
        >
          {({ values, setFieldValue }) => (
            <Form className='md:min-w-[300px] md:min-h-[100px]'>
              <FormField label="" >
                <FormField label="" >
                  <AssosiationStatus setFieldValue={setFieldValue} name='newStatus' />
                </FormField>
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
                <th>شهرستان</th>
                <th>کد</th>
                <th>نام</th>
                <th>تلفن</th>
                <th>تاریخ تاسیس</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clientsPaginated.map((client) => (
                <tr key={client.id} className='[&>*]:text-right'>
                  <td data-label="کد کلاس">{client.shahrestan}</td>
                  <td data-label="نام موسسه">{client.code}</td>
                  <td data-label="کد قرآن" className='text-sm'>{client.name}</td>
                  <td className='text-sm'>{client?.tell?.trim().length == 0 ? 'ندارد' : client.tell}</td>
                  <td data-label="کد مربی" className="lg:w-32">{client?.tarikhTasis?.trim().length < 3 ? 'ندارد' : client.tarikhTasis}</td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons type="justify-start lg:justify-between" noWrap>
                      <BaseButton
                        color="info"
                        icon={mdiUpdate}
                        onClick={() => { setIsModalTrashActive(true); setSelectedClient(client) }}
                        small
                      />
                      <BaseButton
                        color="info"
                        icon={mdiCardAccountDetails}
                        onClick={() => { fetchDetail(client.code); setSelectedClient(client); setIsModalDetailActive(true) }}
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
