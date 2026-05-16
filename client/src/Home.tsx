import { LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { clearToken } from './api'

interface HomeProps {
  username: string
  onLogout: () => void
}

export default function Home({ username, onLogout }: HomeProps) {
  const handleLogout = () => {
    clearToken()
    onLogout()
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-medium">欢迎，{username}</h1>
      <Button variant="outline" onClick={handleLogout}>
        <LogOut />
        退出登录
      </Button>
    </div>
  )
}
