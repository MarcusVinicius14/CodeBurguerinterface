import styled from 'styled-components'
export const ContainerButton = styled.button`
  width: 182px;
  height: 36px;
  background: #9758a6;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  text-align: center;
  border: none;
  color: #eeeeee;
  border-radius: 20px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  &:active {
    opacity: 0.6;
  }
`
