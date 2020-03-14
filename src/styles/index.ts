import styled from 'styled-components'

export const Button = styled.button`
  width: 15vw;
  min-width: 100px;
`

export const SliderItem = styled.article`
  flex: 0 0 19.7%;
  text-align: center;
  margin 0 2px;
  transition: transform 300ms ease 100ms;
  background-color: red;

  &:hover {
    transform: scale(1.5) !important;
  }
`

export const SliderContainer = styled.section`
  display: flex;
  padding: 0 55px;

  &:hover ${SliderItem} {
    transform: translateX(25%);
  }
`
