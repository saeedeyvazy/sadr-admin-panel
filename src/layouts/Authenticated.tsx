import { mdiBackburger, mdiForwardburger, mdiMenu } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AsideMenu from '../components/AsideMenu'
import BaseIcon from '../components/BaseIcon'
import FooterBar from '../components/FooterBar'
import FormField from '../components/FormField'
import NavBar from '../components/NavBar'
import NavBarItemPlain from '../components/NavBarItemPlain'
import { menuList, username } from '../features/login/login.slice'
import menuNavBar from '../menuNavBar'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { setUser } from '../stores/mainSlice'
import Cookies from 'universal-cookie'
import { UserTypeMenu } from '@/config'
type Props = {
  children: ReactNode
}

export default function LayoutAuthenticated({ children }: Props) {
  const dispatch = useAppDispatch()
  const menuAside = useSelector(menuList)
  const [imenu, setImenu] = useState([])

  useEffect(() => {
    setImenu(menuAside.length == 0 ? UserTypeMenu.get(Number(new Cookies().get('menuType'))) : menuAside)
  }, [menuAside])
  useEffect(() => {
    dispatch(
      setUser({
        name: new Cookies().get('username'),
        email: 'john@example.com',
        avatar:
          'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93',
      })
    )
  })

  const darkMode = useAppSelector((state) => state.style.darkMode)

  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false)
  const [isAsideLgActive, setIsAsideLgActive] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsAsideMobileExpanded(false)
      setIsAsideLgActive(false)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [router.events, dispatch])

  const layoutAsidePadding = 'xl:pr-60'

  return (
    <div className={`${darkMode ? 'dark' : ''} overflow-hidden  lg:overflow-visible`} style={{ direction: "rtl", fontFamily: 'Vazir' || 'sans-serif' }}>
      <div
        className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'mr-60 lg:mr-0' : ''
          } pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-100 dark:bg-slate-800 dark:text-slate-100`}
      >
        <NavBar
          menu={menuNavBar}
          className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'mr-60 lg:mr-0' : ''}`}
        >
          <NavBarItemPlain
            display="flex lg:hidden"
            onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
          >
            <BaseIcon path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger} size="24" />
          </NavBarItemPlain>
          <NavBarItemPlain
            display="hidden lg:flex xl:hidden"
            onClick={() => setIsAsideLgActive(true)}
          >
            <BaseIcon path={mdiMenu} size="24" />
          </NavBarItemPlain>
          <NavBarItemPlain useMargin>
            <Formik
              initialValues={{
                search: '',
              }}
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              <Form>
                <FormField isBorderless isTransparent>
                  <Field name="search" placeholder="جستجو" />
                </FormField>
              </Form>
            </Formik>
          </NavBarItemPlain>
        </NavBar>
        <AsideMenu
          isAsideMobileExpanded={isAsideMobileExpanded}
          isAsideLgActive={isAsideLgActive}
          menu={imenu}
          onAsideLgClose={() => setIsAsideLgActive(false)}
        />
        {children}
        <FooterBar>
          {/* Get more with{` `} */}
          <a
            href="https://tailwind-react.justboil.me/dashboard"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600"
          >
          </a>
        </FooterBar>
      </div>
    </div>
  )
}
