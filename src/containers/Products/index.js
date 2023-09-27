import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import ProductsLogo from '../../assets/productsLogo.svg'
import { CardProduct } from '../../components'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import * as C from './styles'

export function Products({ location: { state } }) {
  let categoryId = 0
  if (state?.categoryId) {
    categoryId = state.categoryId
  }

  const [categories, setCategories] = useState([])
  const [products, setproducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState(categoryId)

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories')

      const newCategories = [{ id: 0, name: 'Todos' }, ...data]

      setCategories(newCategories)
    }

    async function loadProducts() {
      const { data: allProducts } = await api.get('products')

      const newProducts = allProducts.map(product => {
        return { ...product, formatedPrice: formatCurrency(product.price) }
      })
      setproducts(newProducts)
    }

    loadProducts()
    loadCategories()
  }, [])

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products)
    } else {
      const newFilteredProducts = products.filter(
        product => product.category_id === activeCategory
      )
      setFilteredProducts(newFilteredProducts)
    }
  }, [activeCategory, products])

  return (
    <C.Container>
      <C.ProductsImg src={ProductsLogo} alt="logo da home" />
      <C.CategoriesMenu>
        {categories &&
          categories.map(category => (
            <C.CategoryButton
              type="button"
              key={category.id}
              isActiveCategory={activeCategory === category.id}
              onClick={() => {
                setActiveCategory(category.id)
              }}
            >
              {category.name}
            </C.CategoryButton>
          ))}
      </C.CategoriesMenu>
      <C.ProductsContainer>
        {filteredProducts &&
          filteredProducts.map(product => (
            <CardProduct key={product.id} product={product} />
          ))}
      </C.ProductsContainer>
    </C.Container>
  )
}

Products.propTypes = {
  location: PropTypes.object
}
