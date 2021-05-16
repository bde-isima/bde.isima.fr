interface SubjectData {
  name: String
  coef: Number
  mark?: Number
}

interface UEData {
  name: String
  subjects: SubjectData[]
  ects: Number
}

interface SectorData {
  name: String
  ues: UEData[]

  isCurrent?: boolean
}

interface SemesterData {
  ues?: UEData[]
  sectors?: SectorData[]
}

interface Year {
  name: String
  semesters: SemesterData[]

  isCurrent?: boolean
}

export type { SubjectData, UEData, SectorData, SemesterData, Year }
