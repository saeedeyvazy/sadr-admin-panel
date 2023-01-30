import { mdiClose } from '@mdi/js'
import { ReactNode } from 'react'
import type { ColorButtonKey } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBox from './CardBox'
import CardBoxComponentTitle from './CardBoxComponentTitle'
import OverlayLayer from './OverlayLayer'

type Props = {
  title: string
  buttonColor: ColorButtonKey
  buttonLabel: string
  isActive: boolean
  children: ReactNode
  innerModalClassName?: string
  onConfirm: () => void
  onCancel?: () => void
}

const CardBoxModal = ({
  title,
  buttonColor,
  buttonLabel,
  isActive,
  children,
  innerModalClassName,
  onConfirm,
  onCancel,
}: Props) => {
  if (!isActive) {
    return null
  }

  const footer = (
    <BaseButtons className='justify-around'>
      <BaseButton label={buttonLabel} color={buttonColor} onClick={onConfirm} />
      {!!onCancel && <BaseButton label="انصراف" color={buttonColor} outline onClick={onCancel} />}
    </BaseButtons>
  )

  return (
    <OverlayLayer onClick={onCancel} className={onCancel ? 'cursor-pointer' : ''}>
      <CardBox
        className={`transition-transform shadow-lg overflow-auto max-h-modal z-50 w-auto ${innerModalClassName}`}
        isModal
        footer={footer}
      >
        <CardBoxComponentTitle title={title}>
          {!!onCancel && (
            <BaseButton icon={mdiClose} color="whiteDark" onClick={onCancel} small roundedFull />
          )}
        </CardBoxComponentTitle>

        <div className="space-y-3">{children}</div>
      </CardBox>
    </OverlayLayer>
  )
}

export default CardBoxModal
