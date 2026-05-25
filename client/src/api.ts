const TOKEN_KEY = 'auth_token'

function getBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? ''
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${getBaseUrl()}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message ?? '登录失败')
  }

  const { token } = await res.json()
  return token as string
}

export async function getMe(): Promise<{ id: string; username: string }> {
  const token = getToken()
  if (!token) throw new Error('未登录')

  const res = await fetch(`${getBaseUrl()}/api/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    clearToken()
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message ?? '获取用户信息失败')
  }

  const { user } = await res.json()
  return user as { id: string; username: string }
}
