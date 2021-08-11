import React from 'react'
import { Container, IconRemove, Td, Th } from './style'
import { NewInput } from '../../../../../../../../../../components/NewInput'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { DetailsTab } from '../../../details'
import { useProduct } from '../../../../../providers/product/ProductProvider'
import { Attributes } from '../../../../../../services/api'

type TableProps = {
  attributesList: Attributes[]
}
export const Table = ({ attributesList }: TableProps): JSX.Element => {
  const { productType, attributes, unitMensured } = useProduct()

  const isTypeSaleOrResale = () =>
    productType === 'venda' || productType === 'revenda'

  const datailsFields = DetailsTab()
  const variationList: any[] = ['', 1]

  return (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          <tr>
            <Th active isTypeSaleOrResale={isTypeSaleOrResale()}>
              Unidade de medidas
            </Th>

            {attributesList.map(
              ({ name, parent_id, isChecked }: any) =>
                parent_id === null && (
                  <Th
                    active={!!isChecked}
                    isTypeSaleOrResale={isTypeSaleOrResale()}
                  >
                    {name}
                  </Th>
                )
            )}
            <Th active isTypeSaleOrResale={isTypeSaleOrResale()}>
              Estoque atual
            </Th>

            <Th active isTypeSaleOrResale={isTypeSaleOrResale()}>
              <TooltipComponent
                label="Reposição de estoque"
                message="Reposição de estoque"
                bold
              />
            </Th>
            {isTypeSaleOrResale() ? (
              <th align="center" style={{ textAlign: 'center' }} colSpan={2}>
                Preço
              </th>
            ) : null}
            <Th active isTypeSaleOrResale={isTypeSaleOrResale()}>
              Ações
            </Th>
          </tr>
          {isTypeSaleOrResale() && (
            <tr>
              <th>Custo</th>
              <th>Venda</th>
            </tr>
          )}
          {variationList.map((variation, index) => (
            <>
              <tr key={index}>
                <td>
                  <NewSelect
                    isSelected={variationList[index]?.unitMensured?.value.name}
                    name="unitMensured"
                    className="form-control"
                  >
                    {unitMensured.map(({ id, name }) => (
                      <option key={id} value={`${id}+${name}`}>
                        {name}
                      </option>
                    ))}
                  </NewSelect>
                </td>
                <>
                  {attributesList.map(
                    (
                      { parent_id, childrenList, id, isChecked },
                      indexAtribute
                    ) =>
                      parent_id === null && (
                        <Td active={isChecked} key={Math.random()}>
                          <NewSelect
                            className="form-control"
                            name="Selecione"
                            id="Selecione"
                          >
                            {attributesList
                              .filter(({ parent_id }) => parent_id === id)
                              .map(itm => (
                                <option key={index}>{itm.name}</option>
                              ))}
                          </NewSelect>
                        </Td>
                      )
                  )}
                  <td>
                    <NewInput
                      name="currentStock"
                      className="form-control"
                      type="text"
                    />
                  </td>
                  <td>
                    <NewInput
                      name="replacementPoint"
                      className="form-control"
                      type="text"
                    />
                  </td>
                </>
                {isTypeSaleOrResale() && (
                  <>
                    <td style={{ width: '150px' }}>
                      <tr>
                        <NewInput
                          name="cost"
                          placeholder="0.00"
                          onKeyPress={event => {
                            const regex = /^[0-9.]+$/
                            if (!regex.test(event.key)) event.preventDefault()
                          }}
                          className="form-control"
                          type="text"
                        />
                      </tr>
                    </td>
                    <td style={{ width: '150px' }}>
                      <tr>
                        <NewInput
                          name="priceSale"
                          disabled
                          placeholder="0.00"
                          onKeyPress={event => {
                            const regex = /^[0-9.]+$/
                            if (!regex.test(event.key)) event.preventDefault()
                          }}
                          className="form-control"
                          type="text"
                        />
                      </tr>
                    </td>
                  </>
                )}
                <td className="actions">
                  <IconRemove
                    className="top"
                    onClick={() => console.log('remove')}
                  />
                </td>
              </tr>
              <tr style={{ borderTop: '3px solid white' }}>
                <td colSpan={3}>
                  <p>Detalhes e Medida</p>
                  {datailsFields}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <hr />
      <button
        onClick={() => console.log('addVariation')}
        className="btn dark btn-sm sbold uppercase"
      >
        <span
          className="fa fa-plus"
          aria-hidden="true"
          style={{ marginRight: '5px' }}
        />
        variação
      </button>
    </Container>
  )
}
