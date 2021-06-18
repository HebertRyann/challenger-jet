import React, { useCallback } from 'react'
import * as S from './style'

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
    <S.Li active={active}>
      <span onClick={onClick}>{title}</span>
    </S.Li>
  )
}

export default TabTitle
