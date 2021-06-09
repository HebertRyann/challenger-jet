import React, { createContext, useCallback, useContext, useState } from 'react'

interface DataTableContext {
  isUpdated: boolean
  updateDataTable: () => void
}

const DataTableContext = createContext<DataTableContext>({} as DataTableContext)

const DataTableProvider = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  const [isUpdated, setIsUpdate] = useState<boolean>(false)

  const updateDataTable = useCallback(() => {
    setIsUpdate(!isUpdated)
  }, [isUpdated])

  return (
    <DataTableContext.Provider value={{ updateDataTable, isUpdated }}>
      {children}
    </DataTableContext.Provider>
  )
}

function useUpdateDataTable(): DataTableContext {
  const context = useContext(DataTableContext)
  if (!context) {
    throw new Error('Updated Provider must be used witin a DataTableProvider')
  }

  return context
}

export { DataTableProvider, useUpdateDataTable }
