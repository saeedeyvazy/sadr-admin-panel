import React, { useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { iaxios } from '@/config'
import { useSnackbar } from 'notistack'
import { Loading } from '@/components/Loading'
import CardBoxModal from '@/components/CardBoxModal'
import BaseDivider from '@/components/BaseDivider'
import { Avatar } from '@/components/Avatar'
import UserAvatar from '@/components/UserAvatar'


export default function Landing() {
    const [amar, setAmar] = useState({})
    const [officeList, setOfficeList] = useState([])
    const [isModalDetailActive, setIsModalDetailActive] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleCloseDetailModal = () => {
        setIsModalDetailActive(false)
    }

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    async function fetchAmar(city) {
        try {
            const response = await iaxios.get('http://185.164.73.213:9000/api/public/landing/amar/?shahrestan='.concat(city))
            console.log(response.data)
            setAmar(response.data.data)
        } catch (error) {
            enqueueSnackbar('خطا در انجام عملیات', { variant: 'error' })
            console.log(error)
        }
    }

    async function fetchOfficeList(city) {
        try {
            const response = await iaxios.get(`http://185.164.73.213:9000/api/public/landing/moasesat/list/?page=0&size=10&shahrestan=${city}&mkh=1`)
            console.log(response.data.data.content)
            setOfficeList(response.data.data.content)
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


    return <>
        <div className='h-full w-full flex flex-col' style={{ fontFamily: 'Vazir' }}>
            <div className="grid grid-cols-4  justify-center items-center  h-14 bg-gray-100 w-full mb-2  shadow-xl  shadow-gray-300">
                <div className='col-span-3 px-4 py-2 flex gap-x-4 text-sm text-black'>
                    <a className='cursor-pointer hover:text-gray-400'><label>مدیریت سامانه</label></a>
                    <a className='cursor-pointer hover:text-gray-400'><label>ورود به پنل اشخاص</label></a>
                    <a className='cursor-pointer hover:text-gray-400'><label>ورود به پنل موسسات و خانه های قرآن</label></a>
                    <a className='cursor-pointer hover:text-gray-400  '><label>محاسبه حق الزحمه مربیان</label></a>
                </div>

                <div className="flex items-center border-b border-teal-500 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:border-none" type="text" placeholder="جستجو" aria-label="Full name" />
                </div>

            </div>
            <div className='flex-1 w-full grid grid-cols-3'>

                <div className='col-span-3'>
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
            </div>
        </div >


        <CardBoxModal
            title="اطلاعات شهر"
            buttonColor="info"
            buttonLabel="تایید"
            isActive={isModalDetailActive}
            onCancel={handleCloseDetailModal}
            innerModalClassName='md:w-6/12'

        >
            <BaseDivider />
            <BaseDivider />
            {
                isLoading ? <Loading />
                    : <>
                        <span className='font-bold text-blue-800' style={{ fontFamily: 'Vazir' }}>آمار کلی</span>
                        <div className='bg-blue-200'>
                            <table style={{ fontFamily: 'Vazir' }}>
                                <thead>
                                    <tr className='[&>*]:text-center whitespace-nowrap text-sm'>
                                        <th>تعداد موسسات</th>
                                        <th>تعداد خانه شهری</th>
                                        <th>تعداد خانه روستایی </th>
                                        <th>تعداد کلاس</th>
                                        <th>تعداد دانش آموزان</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='[&>*]:text-center whitespace-nowrap text-sm'>
                                        <td >{amar.moasesatCount}</td>
                                        <td>{amar.khaneShahriCount}</td>
                                        <td>{amar.khaneRostaiCount}</td>
                                        <td>{amar.kelasCount}</td>
                                        <td>{amar.studentCount}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <BaseDivider />
                        <BaseDivider />
                        <span className='font-bold text-blue-800' style={{ fontFamily: 'Vazir' }}>آمار موسسات </span>
                        <div className='bg-blue-200'>
                            <table style={{ fontFamily: 'Vazir' }}>
                                <thead>
                                    <tr className='[&>*]:text-center [&>*]:text-sm whitespace-nowrap '>
                                        <th>کد موسسه</th>
                                        <th>نام موسسه</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {officeList.map((item) => (
                                        <tr key={item.code} className='[&>*]:text-center [&>*]:text-sm whitespace-nowrap '>
                                            <td >{item.code}</td>
                                            <td className='flex justify-center'>
                                                {item.logo ? <img src={`data:image/jpeg;base64,${item.logo}`} alt='' className='w-8 h-8  rounded-full' /> : <UserAvatar className="w-8 h-8 " username='' />}
                                                <label className='mx-2 text-center'>{item.name}</label>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
            }
        </CardBoxModal >


    </>
}