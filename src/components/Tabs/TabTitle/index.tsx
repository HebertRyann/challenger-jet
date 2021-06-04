import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  title: string
  active: boolean
  index: number
  setSelectedTab: (index: number) => void
}

const TabTitle: React.FC<Props> = ({
  title,
  setSelectedTab,
  index,
  active
}) => {
  const onClick = useCallback(() => {
    setSelectedTab(index)
  }, [setSelectedTab, index])

  return (
    <li className={active ? 'active' : ''}>
      <Link to="#!" onClick={onClick}>
        {title}
      </Link>
    </li>
  )
}

export default TabTitle
