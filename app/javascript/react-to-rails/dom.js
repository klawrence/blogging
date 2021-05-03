export function getCSRFToken() {
  const csrfTag = document.querySelector('meta[name=csrf-token]')
  return csrfTag?.content || 'missing-csrf-token'
}
