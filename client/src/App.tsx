import { useEffect, useState } from 'react'

import { getMe, getToken } from './api'
import Home from './Home'
import Login from './Login'

type AuthState =
  | { status: 'loading' }
  | { status: 'authenticated'; username: string }
  | { status: 'unauthenticated' }

export default function App() {
  const [auth, setAuth] = useState<AuthState>({ status: 'loading' })

  useEffect(() => {
    if (!getToken()) {
      setAuth({ status: 'unauthenticated' })
      return
    }

    getMe()
      .then((user) => setAuth({ status: 'authenticated', username: user.username }))
      .catch(() => {
        setAuth({ status: 'unauthenticated' })
      })
  }, [])

  if (auth.status === 'loading') {
    return null
  }

  if (auth.status === 'authenticated') {
    return (
      <Home
        username={auth.username}
        onLogout={() => setAuth({ status: 'unauthenticated' })}
      />
    )
  }

  return <Login onLoginSuccess={(username) => setAuth({ status: 'authenticated', username })} />
}
