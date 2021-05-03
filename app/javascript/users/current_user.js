const current_user = {
  id: null,
}

export function signIn(id=true) {
  current_user.id = id
}

export function signOut() {
  current_user.id = null
}

export function signedIn() {
  return current_user.id
}
