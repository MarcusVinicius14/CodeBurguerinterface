import styled from 'styled-components'

import BackGroundImg from '../../assets/backGround.svg'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('${BackGroundImg}');
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginImage = styled.img`
  height: 70%;
`

export const ContainerItens = styled.div`
  background-color: #373737;
  border-radius: 0px 10px 10px 0px;
  height: 70%;
  padding: 25px 75px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    color: #ffffff;
    text-align: center;
    margin-top: 100px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

export const Label = styled.p`
  margin: 28px 0 5px 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  text-align: left;
  color: #ffffff;
`

export const Input = styled.input`
  width: 391px;
  height: 38px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 3px 3px 10px 0px #4a90e230;
  border: ${props => (props.error ? '2px solid #CC1717' : 'none')};
  padding-left: 10px;
`

export const SignInLink = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #ffffff;

  a {
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.6;
    }
  }
`
