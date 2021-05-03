const current_user = {
  id: null,
}

export function signIn(id) {
  current_user.id = id || true
}

export function signOut() {
  current_user.id = null
}

export function signedIn() {
  return current_user.id
}
