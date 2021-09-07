import config from '../config'

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT'

export interface RequestResponse {
  status: number
  success: boolean
  message: string
  data: any
}

const generateHeader = (token?: string) => {
  return {
    Authorization: token ? `Bearer ${token}` : undefined,
    'Content-Type': 'application/json',
  }
}

const request = async (
  url: string,
  method: Method,
  body: any,
  headers: any
): Promise<RequestResponse> => {
  if (method !== 'GET' && method !== 'DELETE' && !body)
    return {
      status: 400,
      success: false,
      message: 'No body provided',
      data: null,
    }

  const response = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : null,
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
  body: any,
  token?: string
): Promise<RequestResponse> => {
  return await request(
    `${config.apiURL}/${path}`,
    method,
    body,
    generateHeader(token)
  )
}
