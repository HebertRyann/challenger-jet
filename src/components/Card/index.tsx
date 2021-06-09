import React from 'react'
import { Container } from './styles'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

type PropsCard = {
  number: number
  text: string
  textFooter: string
  valueSubtitleFooter: number
  isProgress?: number
  linkParams?: any
  link?: string
  icon?: IconDefinition
  width: string
}

export const Card = ({
  number,
  text,
  textFooter,
  icon,
  valueSubtitleFooter,
  isProgress,
  link,
  linkParams,
  width
}: PropsCard): JSX.Element => {
  const { push } = useHistory()

  return (
    <Container link={!!link} className={`${width}`}>
      <div
        onClick={() => {
          if (link) push(link, linkParams)
        }}
        className="dashboard-stat2 dark wrapper"
      >
        <section>
          <div className="left number">
            <h3>
              <span data-counter="counterup">{number}</span>
            </h3>
            <p>{text}</p>
          </div>
          <div className="right">
            {icon && (
              <div className="icon">
                <FontAwesomeIcon icon={icon} />
              </div>
            )}
          </div>
        </section>
        <div className="progress-info">
          <div className="progress">
            <span
              style={{ width: !isProgress ? '0%' : `${isProgress}%` }}
              className="progress-bar progress-bar-success black-haze"
            ></span>
          </div>
          <div className="status">
            <div className="status-title">{textFooter}</div>
            {!isProgress ? (
              <div className="status-number">{valueSubtitleFooter}</div>
            ) : (
              <div className="status-number">{`${isProgress} %`}</div>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
