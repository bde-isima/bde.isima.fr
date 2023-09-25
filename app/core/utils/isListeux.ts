export function isListeux(session) {
  if (session.roles.includes('listeux') && !session.roles.includes('bde') && !session.roles.includes('*')) {
    return true;
  } else {
    return false;
  }
}
