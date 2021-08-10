import React from 'react'
import { TooltipComponent } from '../../../../../../../../../components/TooltipComponent'
import { ContainerInput } from './style'
import { Input } from '../../../../../../../../../components/Form'

export const Table = (): JSX.Element => {
  return (
    <>
      <div className="row">
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="Margem de lucro (%)"
            message="Selecione o tipo do produto"
          />
          <Input
            name="priceComposition.profit"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="Simples nacional (%)"
            message="Selecione o tipo do produto"
          />
          <Input
            name="priceComposition.simpleNational"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="IPI (%)"
            message="Selecione o tipo do produto"
          />
          <Input
            name="priceComposition.ipi"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="Custo fixo (%)"
            message="Selecione o tipo do produto"
          />
          <Input
            name="priceComposition.cost"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="DIF ICMS (%)"
            message="Selecione o tipo do produto"
          />
          <Input
            name="priceComposition.dif"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
      </div>
    </>
  )
}
