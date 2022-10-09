export function assertArrayNonEmpty(name, value) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${name} ne doit pas être vide`);
  }
}
