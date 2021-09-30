import styled from 'styled-components'
import devices from './devices'
import { colors } from './theme'

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
  width: 100%;
  z-index: 20;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  alignitems: center;
  transition: all 0.2s ease-in-out;
  top: 0;
  background-color: ${colors.dark['900']};
  border-bottom: 1px solid ${colors.dark['600']};
  padding: 0.5rem;
  flex-wrap: wrap;
`

export const ContentWrapper = styled.div`
  background-color: #1d1f22;
  height: 100%;
  margin-top: ${process.env.NODE_ENV !== 'development' ? '3.5rem' : '0'};
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
  padding: 1.5rem 0;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 91vh;
  box-shadow: inset 10px 10px 100px 1000px rgba(0, 0, 0, 0.6);
  z-index: -1;

  @media ${devices.tablet} {
    flex-direction: row-reverse;
    padding: 1.5rem;
  }
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
