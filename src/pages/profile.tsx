import {
  mdiAccount,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
  mdiMail,
  mdiUpload,
} from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import { useState, type ReactElement } from 'react'
import BaseButton from '../components/BaseButton'
import BaseButtons from '../components/BaseButtons'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import CardBoxComponentBody from '../components/CardBoxComponentBody'
import CardBoxComponentFooter from '../components/CardBoxComponentFooter'
import FormField from '../components/FormField'
import FormFilePicker from '../components/FormFilePicker'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import UserCard from '../components/UserCard'
import type { UserForm } from '../interfaces'
import { getPageTitle, iaxios } from '../config'
import { useAppSelector } from '../stores/hooks'
import { changePassValidation } from '@/validation/form'
import { labels } from '@/constants/labels'
import { useSnackbar } from 'notistack'
import { API_CHANGE_PASSWORD } from '@/constants'
import Cookies from 'universal-cookie'

const ProfilePage = () => {
  const userName = useAppSelector((state) => state.main.userName)
  const userEmail = useAppSelector((state) => state.main.userEmail)

  const userForm: UserForm = {
    name: userName,
    email: userEmail,
  }
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(false)
  async function handleSubmit(request) {
    try {
      setIsLoading(true)
      console.log(request)
      await iaxios.put(API_CHANGE_PASSWORD,
        {
          username: new Cookies().get('username'),
          oldpassword: request.current,
          newpassword: request.new
        })
      setIsLoading(false)
      enqueueSnackbar(labels.succeed, { variant: 'success' })
    } catch (error) {
      setIsLoading(false)
      enqueueSnackbar(labels.unsucceed, { variant: 'error' })
      alert(error)

    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Profile')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccount} title="Profile" main>
          <BaseButton
            href="https://github.com/justboil/admin-one-react-tailwind"
            target="_blank"
            icon={mdiGithub}
            label="Star on GitHub"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <UserCard className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <CardBox className="mb-6">
              <FormField label="تصویر پروفایل" help="Max 500kb">
                <FormFilePicker label="بارگذاری" color="info" icon={mdiUpload} />
              </FormField>
            </CardBox>

          </div>
          <CardBox className="flex-1" hasComponentLayout>
            <Formik
              initialValues={{
                current: '',
                new: ''
              }}
              validationSchema={changePassValidation}
            >
              {({ errors, values }) => (
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>

                    <FormField label={labels.currentPass} help={errors.current} >
                      <Field name="current" type="password" component="input"></Field>
                    </FormField>
                    <FormField label={labels.newPass} help={errors.new} >
                      <Field name="new" type="password" />
                    </FormField>

                    <CardBoxComponentFooter>
                      <BaseButtons>
                        <BaseButton isLoading={isLoading} onClick={() => { handleSubmit(values) }} disabled={errors.current || errors.new} color='info' label={labels.changePass} type='submit' />
                      </BaseButtons>
                    </CardBoxComponentFooter>
                  </CardBoxComponentBody>
                </Form>
              )}
            </Formik>

          </CardBox>

        </div>

      </SectionMain>
    </>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProfilePage
