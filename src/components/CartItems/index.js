import React from 'react'

import { useCart } from '../../hooks/CartContext'
import formatCurrency from '../../utils/formatCurrency'
import * as C from './styles'
export function CartItems() {
  const { cartProducts, increaseProducts, decreaseProducts } = useCart()
  console.log(cartProducts)
  return (
    <C.Container>
      <C.Header>
        <p></p>
        <p>Itens</p>
        <p>Preço</p>
        <p style={{ paddingRight: 40 }}>Quantidade</p>
        <p>Total</p>
      </C.Header>

      {cartProducts && cartProducts.length > 0 ? (
        cartProducts.map(product => (
          <C.Body key={product.id}>
            <img src={product.url} />
            <p>{product.name}</p>
            <p>{formatCurrency(product.price)}</p>
            <div className="quantity-container">
              <button
                onClick={() => {
                  decreaseProducts(product.id)
                }}
              >
                -
              </button>
              <p>{product.quantity}</p>
              <button onClick={() => increaseProducts(product.id)}>+</button>
            </div>
            <p>{formatCurrency(product.quantity * product.price)}</p>
          </C.Body>
        ))
      ) : (
        <C.EmptyCart>Carrinho Vazio</C.EmptyCart>
      )}
    </C.Container>
  )
}
