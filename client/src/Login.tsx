import { useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { login, setToken } from './api'

interface LoginProps {
  onLoginSuccess?: (username: string) => void
}

function decodeUsername(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.username ?? null
  } catch {
    return null
  }
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!username || !password) {
      setError('用户名和密码不能为空')
      return
    }

    setLoading(true)
    setError('')

    try {
      const token = await login(username, password)
      setToken(token)
      onLoginSuccess?.(decodeUsername(token) ?? username)
    } catch (e) {
      setError(e instanceof Error ? e.message : '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-background">
      <div className="flex w-full max-w-sm flex-col px-8">
        <div className="flex flex-col justify-center">
          <div className="mx-auto flex w-full max-w-xs flex-col gap-3">
            <p className="text-center text-sm font-semibold text-black -mb-7">
              Welcome to login
            </p>
            <img
              src="/OmniAge_Logo_4K.svg"
              alt=""
              className="mx-auto w-1/2 object-contain"
            />
            <div className="flex flex-col gap-4 px-4">
              <Input
                placeholder="用户名"
                aria-label="用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
              <Input
                type="password"
                placeholder="密码"
                aria-label="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button
                type="button"
                className="w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin" />}
                {loading ? '登录中...' : '登录'}
              </Button>
            </div>
          </div>
        </div>
        <p className="pb-10 pt-8 text-center text-sm font-semibold text-black">
          Build the intelligence<br />Use the intelligence
        </p>
      </div>
    </div>
  )
}
