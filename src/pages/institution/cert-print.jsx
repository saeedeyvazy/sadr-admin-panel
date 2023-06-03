import { useRouter } from "next/router"
import besmellah from "../../assets/images/besmellah.jpg"
import Image from "next/image"
export default function CertificationPrint() {
    const router = useRouter()
    const { title,
        subtitle,
        flname,
        fthname,
        nationalCode,
        startDate,
        endDate,
        province,
        town,
        officeTitle,
        officeName,
        hours,
        score,
        fname,
        lname,
        birthDate,
        certTitle,
        pic }
        = router.query

    return (
        <div className="w-screen h-screen p-11" style={{ fontFamily: "Vazir" }}>
            <div className="flex flex-row justify-around">
                <div className="flex flex-col justify-start">
                    <img src="http://samanesadr.ir/Styles/Logo/10720293663.jpg" className="w-20 h-20" />
                    <label>تاریخ</label>
                    <label>شماره</label>
                </div>
                <div style={{ fontFamily: "Iran Nastaliq, sans-serif" }} className="flex text-lg flex-col justify-between space-y-6 items-center">
                    <div className="flex flex-col justify-between space-y-4 items-center">
                        <Image alt="" src={besmellah} className="w-[137px] h-[38px]" />
                        <label>{title}</label>
                    </div>
                    <label>{subtitle}</label>

                </div>
                <img src="http://samanesadr.ir/Styles/Logo/10720293663.jpg" className="w-20 h-20" />
            </div>
            <label className="text-lg" style={{ fontFamily: "Iran Nastaliq, sans-serif" }}>گواهی میشود</label>
            <br />
            <br />
            <span>
                <label className="ml-40">{` جناب آقای /سرکار خانم `}</label>
                <label className="font-bold">{flname}</label>
            </span>
            <span>
                <label className="mr-20 ml-20">{`فرزند`}</label>
                <label className="font-bold">{fthname}</label>
            </span>
            <span>
                <label className="mr-20 ml-20">{` دارای شماره ملی `}</label>
                <label className="font-bold">{nationalCode}</label>
            </span>
            <span>
                <label className="mr-10 ml-10">{`متولد`}</label>
                <label className="font-bold">{birthDate}</label>
            </span>
            <br />
            <br />
            <span>
                <label className="mr-10 ml-10">{` در دوره `}</label>
                <label className="font-bold">{` ${title} `}</label>
            </span>
            <span>
                <label className="mr-10 ml-10">{`از تاریخ`}</label>
                <label className="font-bold">{startDate}</label>
            </span>
            <span>
                <label className="mr-10 ml-10">{`تا تاریخ`}</label>
                <label className="font-bold">{endDate}</label>
            </span>
            <span>
                <label className="mr-10 ml-10">{`در استان`}</label>
                <label className="font-bold">{province}</label>
            </span>
            <span>
                <label className="mr-10 ml-10">{`شهرستان`}</label>
                <label className="font-bold">{town}</label>
            </span>
            <br />
            <br />
            <span>
                <label className="mr-10 ml-10">{` ${officeTitle} `}</label>
                <label className="font-bold">{` ${officeName} `}</label>
            </span>
            <span>
                <label className="mr-10 ml-10">{` به مدت `}</label>
                <label className="font-bold">{hours}</label>
                <label className="mr-5 ml-5">{`  شرکت نموده `}</label>
                <label>{` و با نمره  ${score} قبول شده است `}.</label>
            </span>
            <br />
            <br />
            <label style={{ fontFamily: "Iran Nastaliq, sans-serif" }} className="mr-7 text-lg">امید است نامبرده با استمداد از الطاف خاصه خداوند سبحان، نسبت به استمرار
                و طی دوره های بالاتر فراگیری کلام الله مجید اهتمام روز افزون داشته باشد.
            </label>
            <div className="flex justify-end font-bold mt-4" >
                <div className="flex flex-col text-center">
                    <label>{`${fname} ${lname}`}</label>
                    <label>{`مدیر عامل ${officeTitle}`}</label>
                    <label>{officeName}</label>
                </div>
            </div>
            <div className="text-center w-full text-sm mt-10">
                <label>
                    این گواهینامه بدون مهر و امضا فاقد اعتبار بوده و یک نسخه می باشد.</label>
            </div>
        </div >)
}