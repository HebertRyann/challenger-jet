import React from 'react'

import { Container, InconClose } from './style'

type AlertProps = {
  message?: string
  isActive: boolean
  onClickConfirmButton: (id: string) => void
  onClickCancellButton?: () => void
  RenderComponent?: () => JSX.Element
  onlyConfirm?: boolean
}

export const Alert = ({
  message,
  onClickCancellButton,
  onClickConfirmButton,
  isActive,
  onlyConfirm,
  RenderComponent
}: AlertProps): JSX.Element => {
  return (
    <Container isActive={isActive}>
      <main>
        <InconClose
          onClick={() => {
            if (onClickCancellButton) onClickCancellButton()
          }}
        />
        <h4>Atenção</h4>
        <hr />
        {RenderComponent && <RenderComponent />}
        <h4 style={{ fontWeight: 500 }}>{message}</h4>
        <hr />
        <footer>
          <button
            className="btn dark btn-sm sbold uppercase"
            onClick={() => {
              onClickConfirmButton('')
            }}
          >
            Ok
          </button>
          {!onlyConfirm && (
            <button
              className="btn btn-default btn-sm sbold uppercase"
              onClick={onClickCancellButton}
            >
              Cancelar
            </button>
          )}
        </footer>
      </main>
    </Container>
  )
}
