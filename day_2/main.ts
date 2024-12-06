import * as _ from 'https://deno.land/x/lodash@4.17.15-es/lodash.js'

const readDataFromFile = async (): Promise<string> => {
  const decoder = new TextDecoder('utf-8')
  const data = await Deno.readFile("./input.txt")
  return decoder.decode(data)
}

const prepareData = (data: string): number[][] => {
  const arr: number[][] = []
  data = data.replaceAll('\r', ';').replaceAll('\n', '')
  data.split(';').forEach(el => {
    arr.push(el.split(' ').map(i => +i))
  })
  return arr
}

const getUnsafe = (preparedData: number[][]): number[] => {
  const minDistance = 1
  const maxDistance = 3
  const invalidIndexes: number[] = []
  let count = 0

  for (let j = 0; j < preparedData.length; j++) {
    const report = preparedData[j]
    let isAsc = false
    let isDesc = false

    const isReportSafe = (rep: number[]): boolean => {
      for (let i = 0; i < rep.length -1; i++) {
        const level = rep[i]
        const next = rep[i+1]
        const distance = Math.abs(next - level)
    
        if (!isAsc && !isDesc){
          if (next > level) isAsc = true
          else if (next < level) isDesc = true
          else {
            return false
          }
        }
    
        if (isAsc && !(next > level)) {
          return false
        }
    
        if (isDesc && !(next < level)) {
          return false
        }
    
        if (distance > maxDistance || distance < minDistance) {
          return false
        }
      }

      return true
    }

    const res = isReportSafe(report)
    
    if (!res) {
      let isPossibleSafe = false

      for (let k = 0; k < report.length; k++) {
        const tmp = report.filter((value, index) => index !== k)
        
        isPossibleSafe = isReportSafe(tmp)
        if (isPossibleSafe) break
      }

      if (!isPossibleSafe) {
        invalidIndexes.push(j)
      }
    }
  }

  return invalidIndexes
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const rawData = await readDataFromFile();
  const preparedData = prepareData(rawData)

  let unsafeIndexes = getUnsafe(preparedData)
  
  const safe = preparedData.filter((value, index) => !unsafeIndexes.includes(index))

  const result = safe.length

  console.log(result);
  
}