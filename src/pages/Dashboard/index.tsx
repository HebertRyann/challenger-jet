import React from 'react'
import { Card } from '../../components/Card'
import { ControlPanel } from './style'
import { controlsData } from './data'

const Dashboard = (): JSX.Element => (
  <>
    <div className="page-head">
      <div className="container-fluid">
        <div className="page-title">
          <h1>Painel de Controle</h1>
        </div>
      </div>
    </div>
    <ControlPanel className="page-content-inner">
      {controlsData.map(({ name, items }) => (
        <div key={name}>
          <h4>{name}</h4>
          <div className="row">
            {items.map(
              ({
                icon,
                link,
                number,
                text,
                textFooter,
                valueSubtitleFooter
              }) => (
                <Card
                  key={Math.random()}
                  number={number}
                  text={text}
                  textFooter={textFooter}
                  isProgress={0}
                  valueSubtitleFooter={valueSubtitleFooter}
                  width="col-lg-2 col-md-3 col-sm-6 col-xs-12"
                  icon={icon}
                  link={link}
                />
              )
            )}
          </div>
        </div>
      ))}
    </ControlPanel>
  </>
)

export default Dashboard
