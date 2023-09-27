import { Link } from 'react-router-dom'
import styled from 'styled-components'
export const Container = styled.div`
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  padding: 35px 0;

  .rec.rec-arrow {
    background-color: #9758a6;
    color: #efefef;
    box-shadow: 0px 4px 4px 0px #00000040;
  }
  .rec.rec-arrow:hover {
    border: 2px solid #9758a6;
    background-color: #efefef;
    color: #9758a6;
    cursor: pointer;
  }
  .rec.rec-arrow:disabled {
    border: none;
    background-color: #bebebf;
    color: #efefef;
  }
`

export const CategoryImg = styled.img``

export const ContainerItens = styled.div`
  display: flex;
  flex-direction: column;
`

export const Image = styled.img`
  width: 200px;
  border-radius: 10px;
`

export const Button = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  background: #9758a6;
  border-radius: 8px;
  height: 50px;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`
