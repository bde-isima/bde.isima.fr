export function isListeux(session) {
  return (session.roles.includes('listeux') && !session.roles.includes('bde') && !session.roles.includes('*'));
}

export function isTroll(session){
  return (session.roles.includes('troll') && isListeux(session));
}
