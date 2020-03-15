import styled from 'styled-components'

export const Button = styled.button`
  width: 15vw;
  min-width: 100px;
  font-weight: bold;
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
  background-color: #fdfffc;
`

export const GamePageHeader = styled.header`
  background-image: url(${(props: GamePageHeaderProps) =>
    props.backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: space-around;
  padding: 0 1.5em;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 91vh;
  box-shadow: inset 10px 10px 300px 200px rgba(0, 0, 0, 0.9);
  z-index: -1;
`
