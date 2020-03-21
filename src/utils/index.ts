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

export async function preLoadImage(image: string): Promise<boolean> {
  await fetch(image, { method: 'GET' })
  return true
}
