import { labels } from '../../constants/labels'
import { Member } from '../../interfaces'
import BaseButton from '../BaseButton'
import CardBox from '../CardBox'
import PillTag from '../PillTag'
import UserAvatar from '../UserAvatar'

type Props = {
  member: Member,
  deleteItem: any
}



export const DirectorBoardCardBox = (props: Props) => {
  return (
    <CardBox className="mb-6 last:mb-0 shadow-md border border-gray-200 cursor-pointer hover:bg-gray-100 transition duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
          <UserAvatar className="w-16 h-16 md:mr-6 mb-6 md:mb-0" username={props.member.pic} />
          <div className="text-center md:text-right overflow-hidden mx-2 space-y-1">
            <h4 className="text-xl text-ellipsis">{`${props.member.fname} ${props.member.lname}`}</h4>
            <p className="text-gray-500 text-sm whitespace-nowrap dark:text-slate-300">
              {`کد ملی ${props.member.code_p}`}
            </p>

            <PillTag className='whitespace-nowrap flex-row-reverse' color="success" label={props.member.ozviat} />
          </div>
        </div>
        <BaseButton onClick={props.deleteItem} label={labels.delete} color='danger' type='button' />
      </div>
    </CardBox>
  )
}

