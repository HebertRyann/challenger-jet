import React, { createContext, useCallback, useState, useContext } from 'react'

import api from '../services/api'

interface User {
  id: string
  name: string
  email: string
  username: string
  password: string
  avatar_url: string
}

interface Menu {
  id: number
  parent_id?: number
  method?: string
  name: string
  url?: string
  permission: boolean
  children?: Menu[]
}

interface AuthState {
  token: string
  user: User
  menus: Menu[]
}

interface SingInCredentials {
  username: string
  password: string
}

interface AuthContextData {
  user: User
  menus: Menu[]
  signIn(credentials: SingInCredentials): Promise<void>
  signOut(): void
  userLogged(): boolean
  updateUser(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Multfluxo:token')
    const user = localStorage.getItem('@Multfluxo:user')
    const menus = localStorage.getItem('@Multfluxo:menus')

    if (token && user && menus) {
      api.defaults.headers.authorization = `Bearer ${token}`
      return { token, user: JSON.parse(user), menus: JSON.parse(menus) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('sessions', {
      username,
      password
    })

    const { token, user, menus } = response.data

    localStorage.setItem('@Multfluxo:token', token)
    localStorage.setItem('@Multfluxo:user', JSON.stringify(user))
    localStorage.setItem('@Multfluxo:menus', JSON.stringify(menus))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user, menus })
  }, [])

  const userLogged = useCallback(() => {
    const token = localStorage.getItem('@Multfluxo:token')
    if (token) {
      return true
    }
    return false
  }, [])

  const updateUser = useCallback(async () => {
    const user = await (await api.get('/profile/show')).data

    setData({ token: data.token, user, menus: data.menus })

    localStorage.setItem('@Multfluxo:user', JSON.stringify(user))
  }, [data.menus, data.token])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Multfluxo:token')
    localStorage.removeItem('@Multfluxo:user')
    localStorage.removeItem('@Multfluxo:menus')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        menus: data.menus,
        signIn,
        signOut,
        userLogged,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AutProvider')
  }

  return context
}
