import { mdiArrowLeft, mdiTrendingDown, mdiTrendingNeutral, mdiTrendingUp } from '@mdi/js'
import { Manager } from '../../interfaces'
import CardBox from '../CardBox'
import UserAvatar from '../UserAvatar'
import PillTag from '../PillTag'

type Props = {
  manager: Manager
}



export const ManagerCardBox = (props: Props) => {

  const pillColor = () => {
    const startSplitted = props.manager.tarikh_shoro.split("/")
    const endSplitted = props.manager.tarikh_payan?.split("/")
    const managementYears = Number(props.manager.feli ? new Date().toLocaleDateString('fa-IR-u-nu-latn').split("/")[0] : endSplitted[2]) - Number(startSplitted[2])

    if (managementYears >= 1) {
      return 'success'
    }
    if (managementYears < 1) {
      return 'warning'
    }

    return 'danger'
  }


  const pillIcon = {
    success: mdiTrendingUp,
    warning: mdiArrowLeft,
    danger: mdiTrendingDown,
  }[pillColor()]

  const startSplitted = props.manager.tarikh_shoro.split("/")
  const endSplitted = props.manager.tarikh_payan?.split("/")
  const startDate = `${startSplitted[2]}/${startSplitted[1]}/${startSplitted[0]}`
  const endDate = props.manager.feli ? 'اکنون' : `${endSplitted[2]}/${endSplitted[1]}/${endSplitted[0]}`
  const managementYears = Number(props.manager.feli ? new Date().toLocaleDateString('fa-IR-u-nu-latn').split("/")[0] : endSplitted[2]) - Number(startSplitted[2])
  const desc = managementYears < 1 ? 'کمتر از یک سال' : `بیش از ${managementYears} سال`
  return (
    <CardBox className="mb-6 last:mb-0 shadow-md border border-gray-200 cursor-pointer hover:bg-gray-100 transition duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
          <UserAvatar className="w-16 h-16 md:mr-6 mb-6 md:mb-0" username={props.manager.pic} />
          <div className="text-center md:text-right overflow-hidden mx-2 space-y-1">
            <h4 className="text-xl text-ellipsis">{`${props.manager.fname} ${props.manager.lname}`}</h4>
            <p className="text-gray-500 text-sm whitespace-nowrap dark:text-slate-300">
              {`از ${startDate} تا ${endDate}`}
            </p>
          </div>
        </div>
        <PillTag className='whitespace-nowrap flex-row-reverse' color={pillColor()} icon={pillIcon} label={desc} />
      </div>
    </CardBox>
  )
}

