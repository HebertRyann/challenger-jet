import React from 'react'
import { useHistory } from 'react-router'
import { ToolsContainerProps } from '../../../../../../../components/Container'

type HeaderProductProps = {
  tools: ToolsContainerProps[]
  title: string
}

export const HeaderProduct = ({
  tools,
  title
}: HeaderProductProps): JSX.Element => {
  const history = useHistory()

  const handleClickAction = ({
    hasParams,
    icon,
    name,
    to,
    handleOnClick
  }: ToolsContainerProps) => {
    if (!handleOnClick) {
      history.push(`${to}`, {
        id: hasParams ? hasParams.id : '',
        value: hasParams ? hasParams.value : ''
      })
    }
    if (handleOnClick !== undefined) {
      handleOnClick({ hasParams, icon, name, to, handleOnClick })
    }
  }

  return (
    <div className="portlet-title">
      <div className="caption">{title}</div>

      <div className="tools">
        {tools.map(tool => (
          <div
            style={{
              cursor: 'pointer'
            }}
            key={Math.random()}
            onClick={() => {
              handleClickAction(tool)
            }}
          >
            <i style={{ marginRight: '5px' }} className={tool.icon} />
            {tool.name}
          </div>
        ))}
      </div>
    </div>
  )
}
