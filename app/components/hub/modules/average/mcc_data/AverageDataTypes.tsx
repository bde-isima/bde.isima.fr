interface SubjectData {
  name: string
  coef: number
  mark?: number
}

interface UEData {
  name: string
  subjects: SubjectData[]
  ects: number
  average?: number
}

interface SectorData {
  name: string
  ues: UEData[]

  isCurrent?: boolean
  average?: number
}

interface SemesterData {
  sectors: SectorData[]
  average?: number
}

interface Year {
  name: string
  semesters: SemesterData[]

  isCurrent?: boolean
  average?: number
}

export type { SubjectData, UEData, SectorData, SemesterData, Year }
