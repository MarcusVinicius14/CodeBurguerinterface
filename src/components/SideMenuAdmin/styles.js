import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  background: #3c3c3c;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.15);
  width: 300px;
  top: 0;
  left: 0;

  hr {
    margin: 50px 15px;
  }
`

export const ItemContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: ${props => (props.isActive ? '#565656' : 'none')};
  border-radius: 2px;
  margin: 8px;
  padding-left: 20px;

  .icon {
    color: white;
  }
`

export const ListLink = styled(Link)`
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  line-height: 19px;
  text-decoration: none;
  color: #ffffff;
  margin-left: 10px;
`
