import LogoutIcon from '@mui/icons-material/Logout'
import PropTypes from 'prop-types'
import React from 'react'

import { useUser } from '../../hooks/UserContext'
import listLinks from './menu-list'
import * as C from './styles'

export function SideMenuAdmin({ path }) {
  const { logOut } = useUser()
  return (
    <C.Container>
      <hr></hr>
      {listLinks.map(item => (
        <C.ItemContainer key={item.id} isActive={path === item.link}>
          <item.icon className="icon" />
          <C.ListLink to={item.link}>{item.label}</C.ListLink>
        </C.ItemContainer>
      ))}
      <hr></hr>
      <C.ItemContainer style={{ position: 'fixed', bottom: '30px' }}>
        <LogoutIcon style={{ color: '#ffffff' }} />
        <C.ListLink to="/login" onClick={logOut}>
          Sair
        </C.ListLink>
      </C.ItemContainer>
    </C.Container>
  )
}
SideMenuAdmin.propTypes = {
  path: PropTypes.string
}
