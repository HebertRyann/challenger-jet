import React, { useCallback, useState } from 'react'
import { TooltipComponent } from '../../../../../../../../../components/TooltipComponent'
import { NewInput } from '../../../../../../../../../components/NewInput'
import { numericMask } from '../../../../../../../../../utlis/mask'
import { ContainerInput } from './style'
import { useTabCreate } from '../../../../providers/tabsProvider'

export const Table = (): JSX.Element => {
  const { priceComposition } = useTabCreate()
  const { cost, dif, ipi, profit, simpleNational } = priceComposition.getData()

  return (
    <>
      <div className="row">
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="Margem de lucro"
            message="Selecione o tipo do produto"
          />
          <NewInput
            name="input"
            value={numericMask(profit.value)}
            error={profit.error}
            onChange={e =>
              priceComposition.setData({
                ...priceComposition.getData(),
                profit: { error: { isError: false }, value: e.target.value }
              })
            }
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="Simples nacional (%)"
            message="Simples nacional"
          />
          <NewInput
            name="input"
            value={numericMask(simpleNational.value)}
            error={simpleNational.error}
            onChange={e =>
              priceComposition.setData({
                ...priceComposition.getData(),
                simpleNational: {
                  error: { isError: false },
                  value: e.target.value
                }
              })
            }
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
          <NewInput
            name="input"
            value={numericMask(ipi.value)}
            error={ipi.error}
            onChange={e =>
              priceComposition.setData({
                ...priceComposition.getData(),
                ipi: { error: { isError: false }, value: e.target.value }
              })
            }
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="Custo fixo"
            message="Selecione o tipo do produto"
          />
          <NewInput
            name="input"
            value={numericMask(cost.value)}
            error={cost.error}
            onChange={e =>
              priceComposition.setData({
                ...priceComposition.getData(),
                cost: { error: { isError: false }, value: e.target.value }
              })
            }
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="DIF ICMS"
            message="Selecione o tipo do produto"
          />
          <NewInput
            name="input"
            value={numericMask(dif.value)}
            error={dif.error}
            onChange={e =>
              priceComposition.setData({
                ...priceComposition.getData(),
                dif: { error: { isError: false }, value: e.target.value }
              })
            }
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
      </div>
    </>
  )
}
