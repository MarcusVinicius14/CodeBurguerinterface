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

function EditProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const {
    push,
    location: {
      state: { product }
    }
  } = useHistory()
  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.string().required('Digite o preco do produto'),
    category: Yup.object().required('Escolha a categoria do produto'),
    offer: Yup.bool()
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
    productDataFormData.append('offer', data.offer)

    await toast.promise(
      api.put(`products/${product.id}`, productDataFormData),
      {
        pending: 'editando novo produto',
        success: 'produto editado com sucesso',
        error: 'falha ao editar produto'
      }
    )

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
          <C.Input
            type="text"
            {...register('name')}
            defaultValue={product.name}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div>
          <C.Label>Preço</C.Label>
          <C.Input
            type="number"
            {...register('price')}
            defaultValue={product.price}
          />
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
            defaultValue={product.category}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={cat => cat.name}
                  getOptionValue={cat => cat.id}
                  placeholder="Escolha a categoria"
                  defaultValue={product.category}
                />
              )
            }}
          ></Controller>
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>
        <C.ContainerInput>
          <C.Label>Produto em oferta?</C.Label>
          <input
            type="checkbox"
            {...register('offer')}
            defaultChecked={product.offer}
          />
        </C.ContainerInput>

        <C.ButtonEdited>Editar produto</C.ButtonEdited>
      </form>
    </C.Container>
  )
}

export default EditProduct
