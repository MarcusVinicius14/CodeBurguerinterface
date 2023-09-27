import React from 'react'
import { useHistory } from 'react-router-dom'

import Cart from '../../assets/cart.svg'
import Person from '../../assets/person.svg'
import { useUser } from '../../hooks/UserContext'
import * as C from './styles'

export function Header() {
  const { logOut, userData } = useUser()
  const {
    push,
    location: { pathname }
  } = useHistory()

  const logOutUser = () => {
    logOut()
    push('/login')
  }

  return (
    <C.Container>
      <C.ContainerLeft>
        <C.PageLink onClick={() => push('/')} isActive={pathname === '/'}>
          Home
        </C.PageLink>
        <C.PageLink
          onClick={() => push('/produtos')}
          isActive={pathname.includes('produtos')}
        >
          Ver produtos
        </C.PageLink>
      </C.ContainerLeft>
      <C.ContainerRight>
        <C.PageLink>
          <img src={Person} alt="Logo pessoa" />
        </C.PageLink>
        <div className="line"></div>
        <C.PageLink onClick={() => push('/carrinho')}>
          <img src={Cart} alt="carrinho" />
        </C.PageLink>
        <C.ContainerText>
          <p>Ola, {userData.name}</p>
          <C.PageLinkExit onClick={logOutUser}>Sair</C.PageLinkExit>
        </C.ContainerText>
      </C.ContainerRight>
    </C.Container>
  )
}
