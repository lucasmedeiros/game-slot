import styled from 'styled-components'

export const Button = styled.button`
  width: 15vw;
  min-width: 100px;
`

export const LayoutHeader = styled.nav`
  position: sticky;
  max-height: 12vh;
  width: 100%;
  z-index: 20;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  alignitems: center;
  transition: all 0.2s ease-in-out;
  top: 0;
`

export const ContentWrapper = styled.div`
  padding: 15px 0;
  background-color: #fdfffc;
`
