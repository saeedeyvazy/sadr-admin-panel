import { labels } from '@/constants/labels'
import { deleteClass } from '@/features/institution/class/register/regClass.slice'
import { mdiCardAccountDetails, mdiDelete, mdiEye } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useRef, useState } from 'react'
import { DatePicker } from 'react-advance-jalaali-datepicker'
import { useDispatch } from 'react-redux'
import { iaxios } from '../config'
import { API_ADD_STUDENT, API_CLASS_INFO, API_INST_CERT_LIST, API_INST_CLASS_STUDENT_INFO, API_INST_PRINT_CERT, API_SET_SCORE, API_UPDATE_CLASS_ONVAN_DORE } from '../constants'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import BaseDivider from './BaseDivider'
import CardBoxModal from './CardBoxModal'
import { DoreSelect } from './DoreSelect'
import FormField from './FormField'
import { Loading } from './Loading'
export const RegClassReportTable = ({ clients, isLoading }) => {

  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)
  const [teacherDetail, setTeacherDetail] = useState()
  const [classInfo, setClassInfo] = useState()
  const [isActiveAddStudent, setIsActiveAddStudent] = useState(false)

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
  const [selectedStudent, setSelectedStudent] = useState({})

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const handleSubmitOnvanDore = async (values) => {
    try {

      await iaxios.put(API_UPDATE_CLASS_ONVAN_DORE, { codek: selectedClient.codek, onvan: values.onvan_dore })
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
  const handleSubmitScore = async (values) => {
    try {
      const { miyandore, payani, date } = values
      const sal = date.split('/')[0]
      const mah = date.split('/')[1]
      const roz = date.split('/')[2]
      console.log({
        codek: selectedClient.codek,
        id: selectedStudent.id,
        miyandore,
        payani,
        sal,
        mah,
        roz,
        codemelli: selectedStudent.codemelli
      })
      await iaxios.post(API_SET_SCORE, {
        codek: selectedClient.codek,
        id: selectedStudent.id,
        miyandore,
        payani,
        sal,
        mah,
        roz,
        codemelli: selectedStudent.codemelli
      })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })

    } catch (error) {
      console.log(error)
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
    finally {
      setIsActiveScoreModal(false)
    }
  }
  const handleSubmitStudent = async (values) => {
    try {
      const { codemelli } = values

      await iaxios.post(API_ADD_STUDENT, {
        codek: selectedClient.codek,
        codemelli_list: [{ name: codemelli }]
      })
      enqueueSnackbar('عملیات با موفقیت انجام شد', { variant: 'success' })

    } catch (error) {
      console.log(error)
      enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
    }
    finally {
      setIsActiveAddStudent(false)
    }
  }


  const handleModalAction = () => {
    if (updatePassFormRef.current) {
      updatePassFormRef.current.handleSubmit()
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
  const setScoreRef = useRef()
  const addStudentRef = useRef()

  const [isActiveScoreModal, setIsActiveScoreModal] = useState(false)

  async function fetchDetail(id) {
    try {
      const response = await iaxios.get(API_INST_CLASS_STUDENT_INFO, { params: { codek: id, page: 0, size: 30 } })
      const classInfoResponse = await iaxios.get(API_CLASS_INFO, { params: { codek: id } })
      setTeacherDetail(response.data.data.content)

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
  const dispatch = useDispatch()
  function confirmScore() {
    setScoreRef.current.handleSubmit()
    setIsActiveScoreModal(false)
  }
  function confirmAddStudent() {
    addStudentRef.current.handleSubmit()
    setIsActiveAddStudent(false)
  }
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
        <span className='font-bold text-blue-800'>آمار کلاس</span>
        <div className='bg-blue-200'>
          <table className='text-sm'>
            <thead>
              <tr className='[&>*]:text-right'>
                <th>کد کلاس</th>
                <th>تعداد</th>
                <th>نتیجه</th>
                <th>نام</th>
                <th>عنوان دوره</th>
              </tr>
            </thead>
            <tbody>
              {classInfo?.map((item, index) =>
                <tr key={index} className='[&>*]:text-right'>
                  <td>{item.codek}</td>
                  <td>{item.count}</td>
                  <td>{item.natije}</td>
                  <td>{`${item.fname} ${item.lname}`}</td>
                  <td>{item.onvan_dore}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <BaseDivider />
        <BaseDivider />
        <div className='flex justify-between items-center'>
          <span className='font-bold text-blue-800'>اطلاعات دانش آموزان</span>
          <BaseButton label={labels.addStudent} color='success' outeline onClick={() => setIsActiveAddStudent(true)} />
        </div>
        <div className='bg-blue-200'>
          <table className='text-sm'>
            <thead>
              <tr className='[&>*]:text-right'>
                <th>نام</th>
                <th>نمره پایانی</th>
                <th>کد ملی</th>
                <th>نتیجه</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {teacherDetail && teacherDetail.map((item, index) =>
                <tr key={index} className='[&>*]:text-right'>
                  <td>{`${item.fname} ${item.lname}`}</td>
                  <td>{item.payani}</td>
                  <td>{item.codemelli}</td>
                  <td>{item.natije}</td>
                  <td>
                    <BaseButtons>
                      {/* <BaseButton onClick={() => fetchCertificateList(item.codemelli)}>{labels.recentCertificate}</BaseButton> */}
                      <BaseButton label={labels.printCert} onClick={() => generateCertificate(item.codemelli)}></BaseButton>
                      <BaseButton label={labels.setScore} onClick={() => { setIsActiveScoreModal(true); console.log(item); setSelectedStudent(item) }}></BaseButton>
                    </BaseButtons>
                  </td>
                </tr>)
              }
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
        title="حذف کلاس"
        buttonColor="info"
        buttonLabel="تایید"
        isActive={isModalTrashActive}
        onConfirm={() => { dispatch(deleteClass(selectedClient.codek)); setIsModalTrashActive(false) }}
        onCancel={handleCancelModalAction}
      >
        <p>آیا از انجام عملیات مورد نظر اطمینان دارید؟</p>
      </CardBoxModal>
      <CardBoxModal
        title={labels.setScore}
        buttonColor="info"
        buttonLabel="تایید"
        isActive={isActiveScoreModal}
        onConfirm={() => { confirmScore() }}
        onCancel={() => setIsActiveScoreModal(false)}
        innerModalClassName=''
      >
        <BaseDivider />
        <Formik
          initialValues={{
            miyandore: '',
            payani: '',
            date: ''
          }}
          onSubmit={handleSubmitScore}
          innerRef={setScoreRef}
        >
          {({ values, setFieldValue }) => (
            <Form className="p-5" >
              <FormField label="" >
                <FormField label={labels.midScore}>
                  <Field name='miyandore' />
                </FormField>
                <FormField label={labels.finalScore}>
                  <Field name='payani' />
                </FormField>
              </FormField>
              <FormField label={labels.date}>
                <DatePicker
                  inputComponent={(props) => <Field name='date' className="popo" {...props} />}
                  placeholder="انتخاب تاریخ"
                  format="jYYYY/jMM/jDD"
                  onChange={(unix, formatted) => setFieldValue("date", formatted)}
                  id="datePicker"
                  preSelected=""
                  name='datepick'
                />
              </FormField>
            </Form >)
          }
        </Formik >
      </CardBoxModal>


      <CardBoxModal
        title={labels.addStudent}
        buttonColor="info"
        buttonLabel="تایید"
        isActive={isActiveAddStudent}
        onConfirm={() => { confirmAddStudent() }}
        onCancel={() => setIsActiveAddStudent(false)}
        innerModalClassName=''
      >
        <BaseDivider />
        <Formik
          initialValues={{
            codemelli: ''
          }}
          onSubmit={handleSubmitStudent}
          innerRef={addStudentRef}
        >
          {({ values, setFieldValue }) => (
            <Form className="p-5" >
              <FormField label={labels.nationalCode}>
                <Field name='codemelli' />
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
                <th>کد کلاس</th>
                <th>مسول دوره</th>
                <th>عنوان دوره</th>
                <th>کد مربی</th>
                <th>نام مربی</th>
                <th>تعداد اعضا</th>
                <th>شهرستان</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clientsPaginated.map((client) => (
                <tr key={client.id} className='[&>*]:text-right'>
                  <td data-label="کد کلاس">{client.codek}</td>
                  <td data-label="نام موسسه">{client.masooldore}</td>
                  <td data-label="کد قرآن" className='text-sm'>{client.onvan_dore}</td>
                  <td data-label="کد مربی" className="lg:w-32">{client.codeteacher}</td>
                  <td data-label="نام مربی" className="">{`${client.fname} ${client.lname}`}</td>
                  <td data-label="" className="">{client.tedadsherkatkonande}</td>
                  <td data-label="" className="">{client.shahrestan}</td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons type="justify-start lg:justify-between" noWrap>
                      <BaseButton
                        color="danger"
                        icon={mdiDelete}
                        onClick={() => { setIsModalTrashActive(true); setSelectedClient(client) }}
                        small
                      />
                      <BaseButton
                        color="info"
                        icon={mdiEye}
                        onClick={() => { setIsModalInfoActive(true); setSelectedClient(client) }}
                        small
                      />
                      <BaseButton
                        color="info"
                        icon={mdiCardAccountDetails}
                        onClick={() => { fetchDetail(client.codek); setSelectedClient(client); setIsModalDetailActive(true) }}
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
