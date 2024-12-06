const readDataFromFile = async (): Promise<string> => {
  const decoder = new TextDecoder('utf-8')
  const data = await Deno.readFile("./input.txt")
  return decoder.decode(data)
}

interface mapType {
  [key: string]: number
}

const mapArr = (arr: number[]): mapType => {
  const map: mapType = {}
  arr.forEach(item => {
    if (map[`${item}`]) {
      map[`${item}`] += 1
    } else {
      map[`${item}`] = 1
    }
  })
  return map
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  let arr1: number[] = []
  let arr2: number[] = []
  let data: string = await readDataFromFile()
  let result: number = 0
  data = data.replaceAll('\r', ';').replaceAll('\n', '')
  console.log(data.split(';'));
  data.split(';').forEach((item) => {
    const [value1, value2] = item.split('   ')
    arr1.push(+value1)
    arr2.push(+value2)
  })

  // 1
  arr1 = arr1.sort()
  arr2 = arr2.sort()
  for (let i = 0; i< arr1.length; i++) {
    result += Math.abs(arr1[i] - arr2[i])
  }

  console.log(result);

  // 2
  const map: mapType = mapArr(arr2)
  let multiply: number = 0

  arr1.forEach(item => {
    const value = map[`${item}`]
    if (value) {
      multiply += item * value
    }
  })

  console.log(multiply);
}