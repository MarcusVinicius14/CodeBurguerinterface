import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import LoginImg from '../../assets/hamburguerLogin.svg'
import Logo from '../../assets/logo.svg'
import { Button, ErrorMessage } from '../../components'
import { useUser } from '../../hooks/UserContext'
import api from '../../services/api'
import * as C from './styles'

export function Login() {
  const history = useHistory()
  const { putUserData } = useUser()
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatorio'),
    password: Yup.string()
      .required('A senha é obrigatoria')
      .min(6, 'a senha deve ter pelo menos 6 digitos')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    const { data } = await toast.promise(
      api.post('sessions', {
        email: clientData.email,
        password: clientData.password
      }),
      {
        pending: 'Verificando seus dados',
        success: 'Seja bem-vindo(a)',
        error: 'Verifique seu email e senha'
      }
    )

    putUserData(data)

    setTimeout(() => {
      if (data.admin === true) {
        history.push('/pedidos')
      } else {
        history.push('/')
      }
    }, 1000)
  }

  return (
    <C.Container>
      <C.LoginImage src={LoginImg} alt="login-image" />
      <C.ContainerItens>
        <img src={Logo} />
        <h1>Login</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <C.Label>Email</C.Label>
          <C.Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <C.Label>Senha</C.Label>
          <C.Input
            type="password"
            {...register('password')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 75, marginBottom: 25 }}>
            Sign in
          </Button>
        </form>
        <C.SignInLink>
          Não possui conta?{' '}
          <Link style={{ color: 'white' }} to="/cadastro">
            sign Up
          </Link>
        </C.SignInLink>
      </C.ContainerItens>
    </C.Container>
  )
}
