import React from 'react'

import HomeLogo from '../../assets/homeLogo.svg'
import { CategoryCarousel, OffersCarousel } from '../../components'
import * as C from './styles'
export function Home() {
  return (
    <C.Container>
      <C.HomeImg src={HomeLogo} alt="logo da home" />
      <CategoryCarousel />
      <OffersCarousel />
    </C.Container>
  )
}
