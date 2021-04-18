interface Data {
  id: string
  subject: string
  coefficient: number
  mark: number | null
}

function createUEData(id: string, subject: string, coefficient: number, mark: number | null): Data {
  return { id, subject, coefficient, mark }
}

export { createUEData }
