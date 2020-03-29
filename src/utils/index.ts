export function arrayUnique(array: any[] | undefined): any[] {
  if (array) {
    let a: any[] = array.concat()
    for (let i: number = 0; i < a.length; ++i) {
      for (let j: number = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1)
      }
    }

    return a
  }
  return []
}

export function getRandomItemFromArray(array: any[] | undefined): any {
  return array ? array[Math.floor(Math.random() * array.length)] : null
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

export const getUserFromLocalStorage = (): User | undefined => {
  const userFromStorage = JSON.parse(localStorage.getItem('user') as string)

  if (userFromStorage) return userFromStorage

  return undefined
}
