export function assertIsNumber(name, value) {
  if (Number.isNaN(value)) {
    throw new Error(`${name} doit être un nombre`)
  }
}

export function assertPositive(name, value) {
  if (value) {
    if (value < 0) {
      throw new Error(`${name} doit être positif`)
    }
  }
}

export function assertArrayNonEmpty(name, value) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${name} ne doit pas être vide`)
  }
}
