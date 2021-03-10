import React from 'react'

type Props = {
  title: string
}

const Tab: React.FC<Props> = ({ children }) => {
  return <div className="tab-pane fade active in">{children}</div>
}

export default Tab
