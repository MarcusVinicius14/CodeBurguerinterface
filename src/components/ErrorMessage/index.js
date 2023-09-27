import PropTypes from 'prop-types'
import React from 'react'

import * as C from './styles'

export function ErrorMessage({ children }) {
  return <C.ErrorMessageStyles>{children}</C.ErrorMessageStyles>
}
ErrorMessage.propTypes = {
  children: PropTypes.string
}
