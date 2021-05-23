import { Year } from "./types"
import AverageData from "./mcc_data/AverageData"

export const importAverageData = (): {
  averageData: Year[]
  currentYearIndex: number
  currentSectorIndex: number
} => {
  let data: any = localStorage.getItem("average_data")
  if (data === null) {
    data = {
      averageData: AverageData,
      currentYearIndex: 0,
      currentSectorIndex: 0,
    }
  } else {
    data = JSON.parse(data)
  }

  return data
}

export const saveAverageData = (
  averageData: Year[],
  currentYearIndex: number,
  currentSectorIndex: number
) => {
  const dataToStore = {
    averageData: averageData,
    currentYearIndex: currentYearIndex,
    currentSectorIndex: currentSectorIndex,
  }

  const dataToStoreStr = JSON.stringify(dataToStore)

  localStorage.setItem("average_data", dataToStoreStr)
}
