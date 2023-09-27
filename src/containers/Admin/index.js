import PropTypes from 'prop-types'
import React from 'react'

import { SideMenuAdmin } from '../../components'
import paths from '../../constants/paths'
import EditProduct from './EditProduct'
import ListProducts from './ListProducts'
import NewProduct from './NewProduct'
import Orders from './Orders'
import * as C from './styles'
export function Admin({ match: { path } }) {
  return (
    <C.Container>
      <SideMenuAdmin path={path} />
      <C.ContainerItems>
        {path === paths.Order && <Orders />}
        {path === paths.Products && <ListProducts />}
        {path === paths.NewProduct && <NewProduct />}
        {path === paths.EditProduct && <EditProduct />}
      </C.ContainerItems>
    </C.Container>
  )
}
Admin.propTypes = {
  match: PropTypes.object
}
