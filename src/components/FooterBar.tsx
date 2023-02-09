import React, { ReactNode } from 'react'
import { containerMaxW } from '../config'
import JustboilLogo from './JustboilLogo'

type Props = {
  children: ReactNode
}

export default function FooterBar({ children }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer className={`py-2 px-6 ${containerMaxW}`}>
      <div className="block md:flex items-center justify-between md:justify-center">
        <div className="text-center mb-6 md:mb-0">
          <b>
            <a href="" rel="noreferrer" target="_blank">
              کلیه حقوق مادی و معنوی این سامانه متعلق به موسسه تسنیم قرآن و عترت گیلان می باشد
            </a>
            &copy;{` `}{year}
          </b>
          {` `}
          {children}
        </div>

      </div>
    </footer>
  )
}
