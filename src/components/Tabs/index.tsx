import React, { ReactElement, useState } from "react"
import TabTitle from "./TabTitle"

type Props = {
  children: ReactElement[]
}

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div>
      <ul className="nav nav-tabs">
        {children.map((item, index) =>
          (
          <TabTitle
            key={index}
            active={(index === selectedTab)?true:false}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
          />
          )
        )}
      </ul>
      <div className="tab-content">
        {children[selectedTab]}
      </div>
    </div>
  )
}

export default Tabs
