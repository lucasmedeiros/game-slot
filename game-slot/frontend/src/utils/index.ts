import _ from 'lodash'

export function arrayUnique(a: any[] | undefined): any[] {
  return a ? _.uniq(a) : []
}

export function getRandomItemFromArray(a: any[] | undefined): any {
  return a ? _.sample(a) : null
}

export function getObjectFromPath(object: unknown, path: string): any {
  return _.get(object, path)
}

export async function preLoadImage(image: string): Promise<string | null> {
  try {
    const response = await fetch(image, { method: 'GET' })
    const blob = await response.blob()
    const outside = URL.createObjectURL(blob)
    return outside
  } catch (error) {
    return null
  }
}

export const getFromLocalStorage = (key: string): any => {
  const userFromStorage = JSON.parse(localStorage.getItem(key) as string)

  if (userFromStorage) return userFromStorage

  return undefined
}

export const addToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
