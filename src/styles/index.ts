import styled from 'styled-components'

interface GamePageHeaderProps {
  backgroundImage?: string
}

interface GridProps {
  min?: number
}

export const Button = styled.button`
  min-width: 20vw;
  font-weight: bold;
`

export const LayoutHeader = styled.nav`
  position: fixed;
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
  background-color: #2d3748;
  height: 100%;
  padding-bottom: 1em;
`

export const GamePageHeader = styled.header`
  background-image: url(${(props: GamePageHeaderProps) =>
    props.backgroundImage ?? 'none'});
  background-color: black;
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
  box-shadow: inset 10px 10px 100px 1000px rgba(0, 0, 0, 0.6);
  z-index: -1;
`

export const Grid = styled.section`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${(props: GridProps) => props.min || 350}px, 1fr)
  );
  grid-gap: 30px;
  grid-auto-rows: 1fr;
  grid-auto-rows: 1fr;
`
