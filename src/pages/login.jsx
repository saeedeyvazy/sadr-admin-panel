import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import im from "../assets/images/2.jpg"
import title from "../assets/images/title.jpg"
import BaseButton from '../components/BaseButton'
import BaseButtons from '../components/BaseButtons'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import FormCheckRadio from '../components/FormCheckRadio'
import FormField from '../components/FormField'
import SectionFullScreen from '../components/SectionFullScreen'
import { UserType, getPageTitle } from '../config'
import { isLoading, isLoggedin, isRejectedLogin, login } from "../features/login/login.slice"
import { useAppDispatch } from '../stores/hooks'
import { setStyle } from '../stores/styleSlice'

export default function Error() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const loginDispatch = useDispatch()
  const isLoggedinUser = useSelector(isLoggedin)
  const isLoadingUserLogin = useSelector(isLoading)
  const isRejected = useSelector(isRejectedLogin)

  const handleStylePick = ({ e, style }) => {
    dispatch(setStyle(style))
  }
  const handleSubmit = async (e) => {
    handleStylePick(e, 'white')
    loginDispatch(login({ username: e.login, password: e.password, type: UserType.ADMIN }))

  }

  useEffect(() => {
    if (isLoggedinUser)
      router.push('/dashboard')
    if (isRejected)
      enqueueSnackbar('لطفا نام کاربری و رمز خود را بررسی نمایید', { variant: 'error' })
  }, [isLoggedinUser, isRejected])

  return (
    <div style={{ fontFamily: 'Vazir' }}>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>
      <div className='w-full h-full top-0 right-0 left-0 bottom-0 absolute'>
        <Image src={im} alt="" className='w-full h-full bg-cover' />
        <div className='w-full h-full  absolute top-0 left-0 right-0'></div>
      </div>
      <SectionFullScreen bg="bg-hero-pattern">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl z-50">
          <div className='flex justify-center items-center'>
            <Image className='bg-cover w-3/4 h-3/4' src={title} alt='' />
          </div>
          <Formik
            initialValues={{ login: 'admin', password: '3457', remember: true }}
            onSubmit={(e) => handleSubmit(e)}
          >
            <Form className='z-50'>
              <FormField label="نام کاربری" help="نام کاربری خود را وارد کنید">
                <Field name="login" />
              </FormField>

              <FormField label="رمز عبور" help="رمز عبور خود را وارد کنید">
                <Field name="password" type="password" />
              </FormField>

              <FormCheckRadio type="checkbox" label="مرا به خاطر بسپار">
                <Field type="checkbox" name="remember" />
              </FormCheckRadio>

              <BaseDivider />

              <BaseButtons>
                <BaseButton isLoading={isLoadingUserLogin} type="submit" label="ورود به سامانه" color="info" />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </div>
  )

}