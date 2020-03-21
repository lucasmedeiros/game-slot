import config from '../config'

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT'

interface RequestResponse {
  status: number
  success: boolean
  message: string
  data: any
}

const token = 'TOKEN HERE'

const generateHeader = () => ({
  Authorization: `bearer ${token}`,
  'Content-Type': 'application/json',
})

const request = async (
  url: string,
  method: Method,
  body: any,
  headers: any
): Promise<RequestResponse> => {
  if (method !== 'GET' && !body)
    return {
      status: 400,
      success: false,
      message: 'No body provided',
      data: null,
    }

  const response = await fetch(url, {
    method: 'GET',
    body,
    headers,
  })

  const data = await response.json()

  if (response.status >= 400)
    return {
      status: response.status,
      success: false,
      message: data.error,
      data: null,
    }

  return {
    status: response.status,
    success: true,
    message: 'OK',
    data,
  }
}

export const callAPI = async (
  path: string,
  method: Method,
  body: any
): Promise<RequestResponse> => {
  return await request(
    `${config.apiURL}/${path}`,
    method,
    body,
    generateHeader()
  )
}
