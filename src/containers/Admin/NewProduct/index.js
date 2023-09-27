import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { ErrorMessage } from '../../../components'
import api from '../../../services/api'
import * as C from './styles'

function NewProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const { push } = useHistory()
  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.string().required('Digite o preco do produto'),
    category: Yup.object().required('Escolha a categoria do produto'),
    file: Yup.mixed()
      .test('required', 'Carregue um arquivo', value => {
        return value?.length > 0
      })
      .test('fileSize', 'carregue arquivos de ate 2mb', value => {
        return value[0]?.size <= 200000
      })
  })
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('category_id', data.category.id)
    productDataFormData.append('file', data.file[0])
    await toast.promise(api.post('products', productDataFormData), {
      pending: 'criando novo produto',
      success: 'produto criado com sucesso',
      error: 'falha ao criar produto'
    })

    setTimeout(() => {
      push('/listar-produtos')
    }, 2000)
  }

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories')
      setCategories(data)
    }
    loadCategories()
  }, [])

  return (
    <C.Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <C.Label>Nome</C.Label>
          <C.Input type="text" {...register('name')} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div>
          <C.Label>Preço</C.Label>
          <C.Input type="number" {...register('price')} />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>
        <div>
          <C.LabelUpload>
            {fileName || (
              <>
                <CloudUploadIcon />
                Imagem do produto
              </>
            )}

            <C.Input
              type="file"
              accept="image/png, image,jpeg"
              {...register('file')}
              onChange={value => {
                setFileName(value.target.files[0]?.name)
              }}
            />
          </C.LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </div>
        <div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={cat => cat.name}
                  getOptionValue={cat => cat.id}
                  placeholder="Escolha a categoria"
                />
              )
            }}
          ></Controller>
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>
        <C.ButtonEdited>Adicionar produto</C.ButtonEdited>
      </form>
    </C.Container>
  )
}

export default NewProduct
