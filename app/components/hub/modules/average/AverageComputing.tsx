import { SectorData, SemesterData, UEData, Year } from "./types"

export const computeUEAverage = (ue: UEData): number | undefined => {
  let average = 0
  let coefSum = 0

  for (let subjectIndex in ue.subjects) {
    if (ue.subjects[subjectIndex].mark == null) {
      continue
    }

    // @ts-ignore
    average += ue.subjects[subjectIndex].mark * subjects[subjectIndex].coef
    coefSum += ue.subjects[subjectIndex].coef
  }

  if (coefSum === 0) {
    return undefined
  }

  average /= coefSum

  return Math.round(average * 1000) / 1000
}

export const computeSectorAverage = (sector: SectorData): number | undefined => {
  let average = 0
  let sum = 0

  for (let ueIndex in sector.ues) {
    if (sector.ues[ueIndex].average == null) {
      continue
    }

    // @ts-ignore
    average += sector.ues[ueIndex].average
    sum++
  }

  if (sum === 0) {
    return undefined
  }

  average /= sum

  return Math.round(average * 1000) / 1000
}

export const computeSemesterAverage = (
  semester: SemesterData,
  currentSectorIndex: number
): number | undefined => {
  let average = 0
  let count = 0

  // Tronc commun
  if (semester.sectors[0].average) {
    // @ts-ignore
    average += semester.sectors[0].average
    count++
  }

  if (semester.sectors[currentSectorIndex].average) {
    // @ts-ignore
    average += semester.sectors[averageFormState.currentSector].average
    count++
  }

  if (average === 0) {
    return undefined
  }

  average /= 2

  return Math.round(average * 1000) / 1000
}

export const computeYearAverage = (year: Year): number | undefined => {
  let average = 0
  let sum = 0

  for (let semesterIndex in year.semesters) {
    if (year.semesters[semesterIndex].average == null) {
      continue
    }

    // @ts-ignore
    average += year.semesters[semesterIndex].average
    sum++
  }

  if (sum === 0) {
    return undefined
  }

  average /= sum

  return Math.round(average * 1000) / 1000
}
