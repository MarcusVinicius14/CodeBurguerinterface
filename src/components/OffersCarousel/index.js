import React, { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { useHistory } from 'react-router-dom'

import Offers from '../../assets/OFERTAS.png'
import { useCart } from '../../hooks/CartContext'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import * as C from './styles'

export function OffersCarousel() {
  const [offers, setOffers] = useState([])
  const { putProductInCart } = useCart()
  const { push } = useHistory()

  useEffect(() => {
    async function loadOffers() {
      const { data } = await api.get('products')
      console.log(data)
      const onlyOffers = data
        .filter(product => product.offer)
        .map(product => {
          return { ...product, formatedPrice: formatCurrency(product.price) }
        })

      setOffers(onlyOffers)
    }

    loadOffers()
  }, [])

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 }
  ]

  return (
    <C.Container>
      <C.CategoryImg src={Offers} alt="logo da oferta" />
      <Carousel
        itemsToShow={5}
        style={{ width: '90%' }}
        breakPoints={breakPoints}
      >
        {offers &&
          offers.map(product => (
            <C.ContainerItens key={product.id}>
              <C.Image src={product.url} alt="foto da oferta" />
              <p>{product.name}</p>
              <p>{product.formatedPrice}</p>

              <C.Button
                onClick={() => {
                  putProductInCart(product)
                  push('/carrinho')
                }}
              >
                Peça agora
              </C.Button>
            </C.ContainerItens>
          ))}
      </Carousel>
    </C.Container>
  )
}
