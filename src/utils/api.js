// const API_BASE ='https://greenbeli.in/api'
const API_BASE ='http://localhost:5008/api'

const TOKEN_KEY = 'nursery_token'

export function getToken() {
  return window.localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) window.localStorage.setItem(TOKEN_KEY, token)
  else window.localStorage.removeItem(TOKEN_KEY)
}

export async function api(path, options = {}) {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`
  const headers = { ...(options.headers || {}) }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers['Content-Type']
  ) {
    headers['Content-Type'] = 'application/json'
  }
  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { message: text || 'Invalid response' }
  }
  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) || res.statusText || 'Request failed'
    const err = new Error(typeof msg === 'string' ? msg : JSON.stringify(msg))
    err.status = res.status
    throw err
  }
  return data
}
