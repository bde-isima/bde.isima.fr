export function isListeux(session) {
  return (session.roles.includes('listeux') && !session.roles.includes('bde') && !session.roles.includes('*'))
}
