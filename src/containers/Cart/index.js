import React from 'react'

import CartLogo from '../../assets/CartImage.svg'
import { CartItems, CartResume } from '../../components'
import * as C from './styles'
export function Cart() {
  return (
    <C.Container>
      <C.CartImg src={CartLogo} alt="logo da carrinho" />
      <C.Wrapper>
        <CartItems />
        <CartResume />
      </C.Wrapper>
    </C.Container>
  )
}
