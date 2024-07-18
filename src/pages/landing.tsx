import React, { useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useSnackbar } from 'notistack'
import { Loading } from '@/components/Loading'
import CardBoxModal from '@/components/CardBoxModal'
import UserAvatar from '@/components/UserAvatar'
import BaseButton from '@/components/BaseButton'
import CardBoxWidget from '@/components/CardBoxWidget'
import { mdiAbTesting, mdiAccountMultiple, mdiBackburger, mdiCity, mdiCounter, mdiForwardburger, mdiMenu, mdiOfficeBuilding, mdiOfficeBuildingMarker, mdiSearchWeb } from '@mdi/js'
import NavBar from '@/components/NavBar'
import NavBarItemPlain from '@/components/NavBarItemPlain'
import BaseIcon from '@/components/BaseIcon'
import { Field, Form, Formik } from 'formik'
import FormField from '@/components/FormField'
import { useAppSelector } from '@/stores/hooks'
import { landingMenuNavBar } from '@/components/LandingNavBar/menuNavBar'
import axios from 'axios'
import { StackedList } from './StackedList'
import { TeamMemberCard } from './TeamMemberCard'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import CountUp from 'react-countup'

export default function Landing() {
    const [amar, setAmar] = useState({})
    const [wholeProvinceInfo, setWholeProvinceInfo] = useState({})
    const [officeList, setOfficeList] = useState([])
    const [isModalDetailActive, setIsModalDetailActive] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingProvinceInfo, setIsLoadingProvinceInfo] = useState(true)
    const [provinceInfo, setProvinceInfo] = useState([])
    const [teamMemberList, setTeamMemberList] = useState([])
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    }

    const handleCloseDetailModal = () => {
        setIsModalDetailActive(false)
    }

    useEffect(() => {
        var sundte = new Date()
        var yeardte = sundte.getFullYear()
        var monthdte = sundte.getMonth()
        var dtedte = sundte.getDate()
        var daydte = sundte.getDay()
        var sunyear
        switch (daydte) {
            case 0:
                var today = "يکشنبه"
                break
            case 1:
                var today = "دوشنبه"
                break
            case 2:
                var today = "سه شنبه"
                break
            case 3:
                var today = "چهارشنبه"
                break
            case 4:
                var today = "پنجشنبه"
                break
            case 5:
                var today = "جمعه"
                break
            case 6:
                var today = "شنبه"
                break
        }
        switch (monthdte) {
            case 0:
                sunyear = yeardte - 622
                if (dtedte <= 20) {
                    var sunmonth = "دي"
                    var daysun = dtedte + 10
                } else {
                    var sunmonth = "بهمن"
                    var daysun = dtedte - 20
                }
                break
            case 1:
                sunyear = yeardte - 622
                if (dtedte <= 19) {
                    var sunmonth = "بهمن"
                    var daysun = dtedte + 11
                } else {
                    var sunmonth = "اسفند"
                    var daysun = dtedte - 19
                }
                break
            case 2:
                {
                    if ((yeardte - 621) % 4 == 0) var i = 10
                    else var i = 9
                    if (dtedte <= 20) {
                        sunyear = yeardte - 622
                        var sunmonth = "اسفند"
                        var daysun = dtedte + i
                    } else {
                        sunyear = yeardte - 621
                        var sunmonth = "فروردين"
                        var daysun = dtedte - 20
                    }
                }
                break
            case 3:
                sunyear = yeardte - 621
                if (dtedte <= 20) {
                    var sunmonth = "فروردين"
                    var daysun = dtedte + 11
                } else {
                    var sunmonth = "ارديبهشت"
                    var daysun = dtedte - 20
                }
                break
            case 4:
                sunyear = yeardte - 621
                if (dtedte <= 21) {
                    var sunmonth = "ارديبهشت"
                    var daysun = dtedte + 10
                } else {
                    var sunmonth = "خرداد"
                    var daysun = dtedte - 21
                }

                break
            case 5:
                sunyear = yeardte - 621
                if (dtedte <= 21) {
                    var sunmonth = "خرداد"
                    var daysun = dtedte + 10
                } else {
                    var sunmonth = "تير"
                    var daysun = dtedte - 21
                }
                break
            case 6:
                sunyear = yeardte - 621
                if (dtedte <= 22) {
                    var sunmonth = "تير"
                    var daysun = dtedte + 9
                } else {
                    var sunmonth = "مرداد"
                    var daysun = dtedte - 22
                }
                break
            case 7:
                sunyear = yeardte - 621
                if (dtedte <= 22) {
                    var sunmonth = "مرداد"
                    var daysun = dtedte + 9
                } else {
                    var sunmonth = "شهريور"
                    var daysun = dtedte - 22
                }
                break
            case 8:
                sunyear = yeardte - 621
                if (dtedte <= 22) {
                    var sunmonth = "شهريور"
                    var daysun = dtedte + 9
                } else {
                    var sunmonth = "مهر"
                    var daysun = dtedte + 22
                }
                break
            case 9:
                sunyear = yeardte - 621
                if (dtedte <= 22) {
                    var sunmonth = "مهر"
                    var daysun = dtedte + 8
                } else {
                    var sunmonth = "آبان"
                    var daysun = dtedte - 22
                }
                break
            case 10:
                sunyear = yeardte - 621
                if (dtedte <= 21) {
                    var sunmonth = "آبان"
                    var daysun = dtedte + 9
                } else {
                    var sunmonth = "آذر"
                    var daysun = dtedte - 21
                }

                break
            case 11:
                sunyear = yeardte - 621
                if (dtedte <= 19) {
                    var sunmonth = "آذر"
                    var daysun = dtedte + 9
                } else {
                    var sunmonth = "دي"
                    var daysun = dtedte + 21
                }
                break
        }
        document.getElementById("demo").innerHTML =
            today +
            "&nbsp;" +
            [new Number(daysun + 1).toLocaleString('fa-ir')] +
            "&nbsp;" +
            sunmonth +
            "&nbsp;" +
            new Number(sunyear).toLocaleString('fa-ir').replaceAll('٬', '')

        fetchProvinceInfo()
        fetchTeamMemberList()
        fetchAmar(undefined)
    }, [])

    async function fetchProvinceInfo() {
        try {
            const response = await axios.get('http://185.164.73.213:9000/api/public/landing/ostan-amar/list')
            console.log(response.data.data)
            setProvinceInfo(response.data.data)

            setIsLoadingProvinceInfo(false)
        } catch (error) {
            console.log(error)
        }
    }

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    async function fetchAmar(city) {
        try {
            const response = await axios.get('http://185.164.73.213:9000/api/public/landing/amar/?shahrestan='.concat(!city ? '' : city))
            console.log(response.data)
            if (!city)
                setWholeProvinceInfo(response.data.data)
            else
                setAmar(response.data.data)
        } catch (error) {
            enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
            console.log(error)
        }
    }

    async function fetchOfficeList(city) {
        try {
            const response = await axios.get(`http://185.164.73.213:9000/api/public/landing/moasesat/list/?page=0&size=10&shahrestan=${city}&mkh=1`)
            console.log(response.data.data.content)
            setOfficeList(response.data.data.content)
        } catch (error) {
            enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
            console.log(error)
        }
    }
    async function fetchTeamMemberList() {
        try {
            const response = await axios.get(`http://185.164.73.213:9000/api/public/landing/morabi`)
            console.log(response.data.data.lst)
            setTeamMemberList(response.data.data.lst)
        } catch (error) {
            enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
            console.log(error)
        }
    }

    async function fetchCityData({ city }) {
        setIsLoading(true)
        setIsModalDetailActive(true)
        await fetchAmar(city)

        await fetchOfficeList(city)
        setIsLoading(false)
    }

    const darkMode = useAppSelector((state) => state.style.darkMode)

    const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false)
    const [isAsideLgActive, setIsAsideLgActive] = useState(false)

    const layoutAsidePadding = ''
    return <>
        <div className={`${darkMode ? 'dark' : ''} overflow-hidden bg-gray-400  lg:overflow-visible`} style={{ direction: "rtl", fontFamily: 'Vazir' || 'sans-serif' }}>
            <div
                className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'mr-60 lg:mr-0' : ''
                    } pt-14 w-screen transition-position  bg-gray-100 dark:bg-slate-800 dark:text-slate-100`}
            >
                <div className="w-full  grid grid-cols-2 px-2 py-4" style={{ backgroundColor: '#01019e' }}>
                    <div></div>
                    <div className='flex flex-col space-y-4 justify-center items-center'>
                        <img className='w-36 h-16  ' src='https://tehran.quran.ac.ir/uploads/7/2024/Apr/09/1403-1_1.png' />

                        <label className='text-white text-xs' id='demo'></label>
                    </div>
                </div>
                <div>
                    <NavBar
                        menu={landingMenuNavBar}
                        className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'mr-60 lg:mr-0' : ''} bg-blue-700`}
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
                                    <FormField border='border-gray-500' icons={[mdiSearchWeb]} isTransparent>
                                        <Field name="search" placeholder="جستجو" />
                                    </FormField>
                                </Form>
                            </Formik>
                        </NavBarItemPlain>
                    </NavBar>
                </div>
                <div className='bg-gray-900 text-center w-full px-3 py-10 space-y-10'>
                    <h1 className='text-gray-200 font-semibold text-2xl'>آمار کلی استان گیلان به تفکیک اطلاعات</h1>
                    <div className="grid grid-cols-5 gap-2 px-10">
                        <div className=' bg-opacity-5 bg-white px-10 py-5 grid grid-cols-1 gap-y-5'>
                            <label className='text-white font-semibold text-3xl'>

                                <CountUp end={wholeProvinceInfo.moasesatCount} /> +

                            </label>
                            <p className='text-gray-300 font-semibold text-2xl'>تعداد موسسات استان</p>
                        </div>
                        <div className=' bg-opacity-5 bg-white px-10 py-5 grid grid-cols-1 gap-y-5'>
                            <label className='text-white font-semibold text-3xl'><CountUp duration={10} start={1} end={wholeProvinceInfo.kelasCount} /> + </label>
                            <p className='text-gray-300 font-semibold text-2xl'>تعداد کلاس های استان</p>
                        </div>
                        <div className=' bg-opacity-5 bg-white px-10 py-5 grid grid-cols-1 gap-y-5'>
                            <label className='text-white font-semibold text-3xl'><CountUp duration={10} start={1} end={wholeProvinceInfo.khaneShahriCount} /> +</label>
                            <p className='text-gray-300 font-semibold text-2xl'>  تعداد خانه شهری استان</p>
                        </div>
                        <div className=' bg-opacity-5 bg-white px-10 py-5 grid grid-cols-1 gap-y-5'>
                            <label className='text-white font-semibold text-3xl'><CountUp duration={10} start={1} end={wholeProvinceInfo.studentCount} />  +</label>
                            <p className='text-gray-300 font-semibold text-2xl'>تعداد  دانش آموزان استان</p>
                        </div>
                        <div className=' bg-opacity-5 bg-white px-10 py-5 grid grid-cols-1 gap-y-5'>
                            <label className='text-white font-semibold text-3xl'> <CountUp duration={10} start={1} end={wholeProvinceInfo.khaneRostaiCount} />  + </label>
                            <p className='text-gray-300 font-semibold text-2xl'>تعداد  خانه روستایی استان</p>
                        </div>
                    </div>

                </div>

                <div className='py-2'>

                    <Map
                        mapboxAccessToken="pk.eyJ1Ijoic2FlZWRleXZhenkiLCJhIjoiY2x5YjJsZXVkMTViMjJqcXR5cWVjanA3NyJ9.bVIOP-8nJPyxON1p2eOYxQ"
                        initialViewState={{
                            longitude: 49.8,
                            latitude: 37.3,
                            zoom: 6.9
                        }}

                        style={{ width: '100%', height: 400, color: 'red' }}
                        // mapStyle={mapStyle}
                        mapStyle="mapbox://styles/mapbox/light-v9"
                    >
                        <Marker longitude={49.583057} latitude={37.280834} anchor="bottom" onClick={() => fetchCityData({ city: 'رشت' })} ></Marker>
                        <Marker longitude={50.2836} latitude={37.1378} anchor="bottom" onClick={() => fetchCityData({ city: 'رودسر' })}  ></Marker>
                        <Marker longitude={50.1927} latitude={37.0945} anchor="bottom" onClick={() => fetchCityData({ city: 'املش' })}  ></Marker>
                        <Marker longitude={50.157520} latitude={37.187820} anchor="bottom" onClick={() => fetchCityData({ city: 'لنگرود' })}  ></Marker>
                        <Marker longitude={50.003367} latitude={37.2070730} anchor="bottom" onClick={() => fetchCityData({ city: 'لاهیجان' })}  ></Marker>
                        <Marker longitude={49.9432} latitude={37.2656} anchor="bottom" onClick={() => fetchCityData({ city: 'آستانه' })}  ></Marker>
                        <Marker longitude={49.8719} latitude={37.1544} anchor="bottom" onClick={() => fetchCityData({ city: 'سیاهکل' })}  ></Marker>
                        <Marker longitude={49.4161} latitude={36.8097} anchor="bottom" onClick={() => fetchCityData({ city: 'رودبار' })}  ></Marker>
                        <Marker longitude={49.402591} latitude={37.171440} anchor="bottom" onClick={() => fetchCityData({ city: 'شفت' })}  ></Marker>
                        <Marker longitude={49.3123} latitude={37.2243} anchor="bottom" onClick={() => fetchCityData({ city: 'فومن' })}  ></Marker>
                        <Marker longitude={49.3178} latitude={37.3049} anchor="bottom" onClick={() => fetchCityData({ city: 'صومعه سرا' })}  ></Marker>
                        <Marker longitude={49.4799} latitude={37.4639} anchor="bottom" onClick={() => fetchCityData({ city: 'بندر انزلی' })}  ></Marker>
                        <Marker longitude={49.1324} latitude={37.3633} anchor="bottom" onClick={() => fetchCityData({ city: 'ماسال' })}  ></Marker>
                        <Marker longitude={49.1399} latitude={37.5512} anchor="bottom" onClick={() => fetchCityData({ city: 'رضوانشهر' })}  ></Marker>
                        <Marker longitude={48.9045} latitude={37.7933} anchor="bottom" onClick={() => fetchCityData({ city: 'تالش' })}  ></Marker>
                        <Marker longitude={48.8728} latitude={38.4688} anchor="bottom" onClick={() => fetchCityData({ city: 'آستارا' })}  ></Marker>
                    </Map>

                </div>

            </div >


            <CardBoxModal
                title="اطلاعات شهر"
                buttonColor="info"
                buttonLabel="تایید"
                isActive={isModalDetailActive}
                onCancel={handleCloseDetailModal}
                innerModalClassName='bg-gray-300 w-3/4'
            >

                {
                    isLoading ? <Loading />
                        : <>
                            <span className='font-bold text-blue-800' style={{ fontFamily: 'Vazir' }}>آمار کلی</span>
                            <div className="grid grid-cols-4 gap-2 p-2 mb-6 text-sm" style={{ fontFamily: 'Vazir' }}>
                                <CardBoxWidget
                                    trendLabel="12%"
                                    trendType="up"
                                    trendColor="success"
                                    icon={mdiOfficeBuildingMarker}
                                    iconColor="success"
                                    number={amar.moasesatCount}
                                    label="تعداد موسسات"

                                />
                                <CardBoxWidget
                                    trendLabel="2%"
                                    trendType="down"
                                    trendColor="danger"
                                    icon={mdiOfficeBuilding}
                                    iconColor="info"
                                    number={amar.khaneShahriCount}
                                    numberPrefix=""
                                    label="تعداد خانه شهری"
                                />
                                <CardBoxWidget
                                    trendLabel="9%"
                                    trendType="up"
                                    trendColor="success"
                                    icon={mdiCity}
                                    iconColor="danger"
                                    number={amar.khaneRostaiCount}
                                    numberSuffix=""
                                    label="تعداد خانه روستایی"
                                />
                                <CardBoxWidget
                                    trendLabel="19%"
                                    trendType="up"
                                    trendColor="success"
                                    icon={mdiAccountMultiple}
                                    iconColor="success"
                                    number={amar.studentCount}
                                    numberSuffix=""
                                    label="تعداد دانش آموزان "
                                />
                                <CardBoxWidget
                                    trendLabel="16%"
                                    trendType="up"
                                    trendColor="success"
                                    icon={mdiAbTesting}
                                    iconColor="danger"
                                    number={amar.kelasCount}
                                    numberSuffix=""
                                    label="تعداد کلاس"
                                />
                            </div>


                            <span className=' font-bold text-blue-800' style={{ fontFamily: 'Vazir' }}>آمار موسسات </span>
                            <div className='bg-blue-200 mt-3'>
                                <table style={{ fontFamily: 'Vazir' }}>
                                    <thead>
                                        <tr className='[&>*]:text-center [&>*]:text-sm whitespace-nowrap '>
                                            <th>کد موسسه</th>
                                            <th>نام موسسه</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {officeList.map((item) => (<>
                                            <tr key={item.code} className='[&>*]:text-center [&>*]:text-sm whitespace-nowrap '>
                                                <td >{item.code}</td>
                                                <td className='flex justify-center items-center'>
                                                    {item.logo ? <img src={`data:image/jpeg;base64,${item.logo}`} alt='' className='w-8 h-8  rounded-full' /> : <UserAvatar className="w-8 h-8 " username='' />}
                                                    <label className='mx-2 text-center'>{item.name}</label>
                                                </td>
                                                <td><BaseButton label='detail' onClick={() => document.getElementById(item.code).style.display = ''} >

                                                </BaseButton>
                                                </td>
                                            </tr>
                                            <tr id={item.code} style={{ display: 'none' }}> test</tr>
                                        </>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                }
            </CardBoxModal >

            {isLoadingProvinceInfo ? <Loading /> :
                provinceInfo && provinceInfo.length &&
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    responsive={responsive}
                    ssr={false} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    centerMode={true}
                    autoPlaySpeed={4000}
                    // centerMode={true}
                    keyBoardControl={true}
                    customTransition="all 2s linear"
                    transitionDuration={3000}
                    containerClass="px-5 py-5 mt-1 "
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    // deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {provinceInfo.map((item, index) =>
                        <StackedList key={index} list={item} />)}
                </Carousel>}


            {/* </div> */}

            <div className=' bg-gray-900  mt-4 px-10 py-7'>
                <label className='text-white font-semibold text-lg'>مربیان سامانه جامع  قرآنی صدر</label>
                <div className="grid grid-cols-4 gap-16 mt-10">
                    {isLoadingProvinceInfo ? <Loading /> :
                        teamMemberList && teamMemberList.length &&
                        teamMemberList.map((item, index) =>
                            <TeamMemberCard key={index} member={item} />
                            //         <CardBoxWidget
                            //             key={index}
                            //             trendLabel={`نسبت دانش آموزان به کل جمعیت  ${item.nesbat}`}
                            //             trendType="up"
                            //             trendColor="success"
                            //             icon={mdiCounter}
                            //             iconColor="danger"
                            //             number={item.studentCount}
                            //             numberSuffix=" دانش آموز"
                            //             label={item.shahrestan}
                            //         />)
                        )}

                </div>
            </div>

        </div>
    </>
}