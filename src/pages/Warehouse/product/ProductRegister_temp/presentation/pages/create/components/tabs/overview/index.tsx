import React, { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { CategoryCostModel } from '../../../../../../domain/models/categoryCost'
import { useFormApplication } from '../../../../../providers/form/FormProvider'
import { useProduct } from '../../../../../providers/product/ProductProvider'
import { getError } from '../../../../../utils/getErrors'
import { InputForm } from '../../form/input'
import { Container } from './styles'

export const OverviewTab = (): JSX.Element => {
  const { loadTypeProducts, loadGroupProduct, loadCategoriesCost } =
    useProduct()
  const { register } = useFormContext()
  const { errors } = useFormApplication()
  const [subCategoryCost, setSubCategoryCost] = useState<CategoryCostModel[]>(
    []
  )

  const onChangeCategoryCost = useCallback(
    (parentId: string) => {
      const idParent = parentId.split('+')[0]
      if (idParent) {
        const subcategoryCost = loadCategoriesCost().filter(
          ({ parent_id }) => parent_id?.toString() === idParent
        )
        setSubCategoryCost(subcategoryCost)
      }
    },
    [loadCategoriesCost]
  )

  return (
    <>
      <Container className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Tipo do produto"
            message="Selecione o tipo do produto"
          />
          <NewSelect
            className={`form-control ${getError(
              errors?.overview?.typeProduct
            )}`}
            {...register('overview.typeProduct', {
              required: true
            })}
          >
            {loadTypeProducts().map(({ key, name, label }) => (
              <option key={key} value={key + '+' + name}>
                {label}
              </option>
            ))}
          </NewSelect>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Grupo do produto"
            message="selecione o grupo do produto"
          />
          <NewSelect
            className={`form-control ${getError(
              errors?.overview?.groupProduct
            )}`}
            {...register('overview.groupProduct', {
              required: true
            })}
          >
            {loadGroupProduct().map(({ name, id }) => (
              <option key={id} value={id + '+' + name}>
                {name}
              </option>
            ))}
          </NewSelect>
        </div>
        <div className="form-content col-md-6">
          <TooltipComponent
            label="Nome do produto"
            message="Selecione o nome do produto"
          />
          <InputForm
            name={'overview.nameProduct'}
            required
            error={errors?.overview?.nameProduct}
          />
        </div>
      </Container>
      <Container className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Categoria de custo"
            message="Selecione a categoria de custo"
          />
          <NewSelect
            className={`form-control ${getError(
              errors?.overview?.categoryCost
            )}`}
            {...register('overview.categoryCost', {
              required: true
            })}
            onChange={({ target }) => onChangeCategoryCost(target.value)}
          >
            {loadCategoriesCost()
              .filter(({ parent_id }) => parent_id === null)
              .map(({ id, name }) => (
                <option key={id} value={id + '+' + name}>
                  {name}
                </option>
              ))}
          </NewSelect>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Subcategoria de custo"
            message="selecione o subcategoria de custo"
          />
          <NewSelect
            className={`form-control ${getError(
              errors?.overview?.subcategoryCost
            )}`}
            {...register('overview.subcategoryCost', {
              required: true
            })}
          >
            {subCategoryCost.length >= 0
              ? subCategoryCost.map(({ name, id }) => (
                  <option key={id} value={id + '+' + name}>
                    {name}
                  </option>
                ))
              : []}
          </NewSelect>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Possui variação?"
            message="selecione se existe variação"
          />
          <select
            className={`form-control ${getError(
              errors?.overview?.hasVariation
            )}`}
            {...register('overview.hasVariation', {
              required: true
            })}
          >
            <option className="disable" selected={true} disabled>
              selecione
            </option>
            <option value="s">sim</option>
            <option value="n">não</option>
          </select>
        </div>
      </Container>
    </>
  )
}
