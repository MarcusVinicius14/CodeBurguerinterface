import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { useCart } from '../../hooks/CartContext'
import { Button } from '../Button'
import * as C from './styles'

export function CardProduct({ product }) {
  const { putProductInCart } = useCart()
  const { push } = useHistory()
  return (
    <C.Container>
      <C.Image src={product.url} alt="imagem do produto" />
      <div>
        <C.ProductName>{product.name}</C.ProductName>
        <C.ProductPrice>{product.formatedPrice}</C.ProductPrice>
        <Button
          onClick={() => {
            putProductInCart(product)
            push('/carrinho')
          }}
        >
          Adicionar
        </Button>
      </div>
    </C.Container>
  )
}

CardProduct.propTypes = {
  product: PropTypes.object
}
