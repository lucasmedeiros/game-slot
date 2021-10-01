import Radium from 'radium'
import devices from '../../../styles/devices'

const header: Radium.StyleProps['rules'] = {
  display: 'flex',
  width: '100%',
  padding: process.env.NODE_ENV !== 'development' ? '1rem 0' : 0,
  alignItems: 'center',
  flexDirection: 'column',
  [`@media ${devices.tablet}`]: {
    padding: process.env.NODE_ENV !== 'development' ? '1rem 0' : 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
}

const title: Radium.StyleProps['rules'] = {
  color: 'white',
  fontSize: '32px',
  marginBottom: '1rem',
  [`@media ${devices.tablet}`]: {
    marginBottom: '0',
  },
}

export default {
  header,
  title,
}
