const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '')
const TOKEN_KEY = 'makon_token'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    // localStorage mavjud bo'lmasa, token faqat joriy sessiya davomida ishlamaydi
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    // e'tiborsiz qoldiriladi
  }
}

export async function api(path, { method = 'GET', body } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('Serverga ulanib bo‘lmadi. Backend ishlayotganini tekshiring.', 0)
  }

  let data = null
  try {
    data = await response.json()
  } catch {
    // javob JSON bo'lmasligi mumkin
  }

  if (!response.ok) {
    throw new ApiError(data?.message || 'Xatolik yuz berdi.', response.status)
  }
  return data
}
