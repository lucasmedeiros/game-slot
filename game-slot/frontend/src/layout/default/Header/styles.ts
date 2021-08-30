import Radium from 'radium'
import devices from '../../../styles/devices'

const logoContainer: Radium.StyleProps['rules'] = {
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  flexShrink: 0,
  marginRight: '1.5rem',
  flexWrap: 'wrap',
}

const logoButton: Radium.StyleProps['rules'] = {
  fontWeight: 700,
  fontSize: '1.25rem',
  lineHeight: '1.75rem',
  [`@media ${devices.tablet}`]: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },
}

const hamburgerButton: Radium.StyleProps['rules'] = {
  color: 'white',
  marginRight: '0.5rem',
  [`@media ${devices.tablet}`]: {
    display: 'none',
  },
}

export default {
  logoContainer,
  logoButton,
  hamburgerButton,
}
