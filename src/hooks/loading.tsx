import React, { createContext, useCallback, useContext, useState } from 'react'

interface LoaddingContext {
  loading: boolean
  activeLoading: () => void
  disableLoading: () => void
}

const LoadingContext = createContext<LoaddingContext>({} as LoaddingContext)

const LoadingProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const activeLoading = useCallback(() => {
    setLoading(true)
  }, [])

  const disableLoading = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <LoadingContext.Provider value={{ activeLoading, disableLoading, loading }}>
      {children}
    </LoadingContext.Provider>
  )
}

function useLoading(): LoaddingContext {
  const context = useContext(LoadingContext)

  if (!context) {
    throw new Error('useLoading must be used witin a LoadingProvider')
  }

  return context
}

export { LoadingProvider, useLoading }
