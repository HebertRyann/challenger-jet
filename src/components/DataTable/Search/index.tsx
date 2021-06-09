import React, { useState } from 'react'

interface TableSearchProps {
  onSearch(value: string): void
}

const Search: React.FC<TableSearchProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('')

  const onInputChange = (value: string) => {
    setSearch(value)
    onSearch(value)
  }
  return (
    <input
      type="text"
      className="form-control input-sm input-small input-inline"
      style={{ width: '240px' }}
      value={search}
      onChange={e => onInputChange(e.target.value)}
    />
  )
}

export default Search
