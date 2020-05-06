interface Option {
  apiURL: string
}

interface ConfigOptions {
  development: Option
  production: Option
}

const config: ConfigOptions = {
  development: {
    apiURL: 'http://192.168.1.8:8000',
  },
  production: {
    apiURL: `${process.env.REACT_APP_API_URL}`,
  },
}

export default process.env.NODE_ENV === 'development'
  ? config.development
  : config.production
