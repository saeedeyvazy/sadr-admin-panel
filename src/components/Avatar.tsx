/* eslint-disable @next/next/no-img-element */
// Why disabled:
// avatars.dicebear.com provides svg avatars
// next/image needs dangerouslyAllowSVG option for that

import { mdiAccount } from '@mdi/js'
import React, { ReactNode } from 'react'
import BaseIcon from './BaseIcon'

type Props = {
  username: string
  avatar?: string | null
  api?: string
  className?: string
  children?: ReactNode
}

export function Avatar({
  username,
  avatar = null,
  api = 'avataaars',
  className = '',
  children,
}: Props) {

  return (
    <div className={className}>
      {avatar ?
        <img
          src={`data:image/png;base64,${avatar}`}
          alt={username}
          className="rounded-full shadow-lg block h-full w-full max-w-full bg-gray-100 dark:bg-slate-800"
        />
        :
        <BaseIcon
          path={mdiAccount}
          size="48"
          w="w-16"
          h="h-16"
        />
      }
      {children}
    </div>
  )
}
