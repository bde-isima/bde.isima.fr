interface SubjectData {
  name: string
  coef: number
  mark?: number
}

interface UEData {
  name: string
  subjects: SubjectData[]
  ects: number
}

interface SectorData {
  name: string
  ues: UEData[]

  isCurrent?: boolean
}

interface SemesterData {
  sectors: SectorData[]
}

interface Year {
  name: string
  semesters: SemesterData[]

  isCurrent?: boolean
}

export type { SubjectData, UEData, SectorData, SemesterData, Year }
