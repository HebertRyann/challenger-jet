import React, { useCallback } from 'react'

import { useTabs } from '../../../../../../../hooks/tabs'

type Link = {
  link: string
  name: string
}

type TypeAlertContentProps = {
  onClickItem?: (params: any) => void
  links: Link[]
}

export const AlertContent = ({
  onClickItem,
  links
}: TypeAlertContentProps): JSX.Element => {
  const { changeCurrentTab } = useTabs()

  const handlerClickAlertConfirm = useCallback(
    (link: string) => {
      changeCurrentTab(link)
      if (onClickItem) onClickItem(link)
    },
    [alert]
  )

  return (
    <h4 style={{ fontWeight: 300 }}>
      Os campos destacados na aba(s){': '}
      {links
        .filter(({ link }) => link !== '')
        .map(({ link, name }, index) => (
          <div
            key={index}
            onClick={() => {
              handlerClickAlertConfirm(link)
            }}
            style={{ margin: '40px; 0', cursor: 'pointer' }}
          >
            <h6 style={{ fontWeight: 700, fontSize: '18px' }}>{name}</h6>
          </div>
        ))}
      são de preenchimento obrigatório
    </h4>
  )
}
