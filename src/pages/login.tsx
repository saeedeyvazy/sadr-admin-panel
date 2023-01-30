import React, { useRef } from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/SectionFullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/FormField'
import FormCheckRadio from '../components/FormCheckRadio'
import BaseDivider from '../components/BaseDivider'
import BaseButtons from '../components/BaseButtons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import { setDarkMode, setStyle } from '../stores/styleSlice'
import { StyleKey } from '../interfaces'
import { useAppDispatch } from '../stores/hooks'
import im from "../assets/images/2.jpg"
import title from "../assets/images/title.jpg"
import Image from 'next/image'
import axios from "axios"
import { API_LOGIN_URL } from '../constants'
import Cookies from 'universal-cookie'

export default function Error() {
  const router = useRouter()
  const dispatch = useAppDispatch()


  const handleStylePick = (e: React.MouseEvent, style: StyleKey) => {
    dispatch(setStyle(style))
  }
  const handleSubmit = async (e) => {
    handleStylePick(e, 'white')
    try {
      const response = await axios.post(API_LOGIN_URL, { username: e.login, password: e.password })
      console.log(response)
      if (response.data.success) {
        new Cookies().set('token', response.data.data.token)
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }

  }

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
            <Image className='bg-cover w-full h-full' src={title} alt='' />
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
                <BaseButton type="submit" label="ورود به سامانه" color="info" />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </div>
  )
}

Error.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
