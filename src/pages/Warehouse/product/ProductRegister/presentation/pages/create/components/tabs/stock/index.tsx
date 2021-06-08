import React from 'react'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { Container } from './styles'
import { InputFormController } from '../../form/input'

export const StockTab = (): JSX.Element => {
  return (
    <>
      <Container className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Estoque atual"
            message="Informe o estoque atual"
          />
          <InputFormController name="stock.currentStock" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Reposição de estoque"
            message="Informe o ponto de reposição de estoque"
          />
          <InputFormController name="stock.repositionPoint" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent label="Espessura" message="Informe a espessura" />
          <InputFormController name="stock.thickness" />
        </div>
      </Container>
    </>
  )
}
