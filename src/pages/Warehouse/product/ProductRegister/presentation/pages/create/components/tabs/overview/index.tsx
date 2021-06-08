import React, { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { CategoryCostModel } from '../../../../../../domain/models/categoryCost'
import { useFormApplication } from '../../../../../providers/form/FormProvider'
import { useProduct } from '../../../../../providers/product/ProductProvider'
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

  const getError = (error: any): string => {
    if (error) return 'error'
    return ''
  }

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
          <select
            className={`form-control ${getError(
              errors?.overview?.typeProduct
            )}`}
            {...register('overview.typeProduct', {
              required: true
            })}
          >
            <option className="disable" selected={true} disabled>
              selecione
            </option>
            {loadTypeProducts().map(({ key, name, label }) => (
              <option key={key} value={key + '+' + name}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Grupo do produto"
            message="selecione o grupo do produto"
          />
          <select
            className={`form-control ${getError(
              errors?.overview?.groupProduct
            )}`}
            {...register('overview.groupProduct', {
              required: true
            })}
          >
            <option className="disable" selected={true} disabled>
              selecione
            </option>
            {loadGroupProduct().map(({ name, id }) => (
              <option key={id} value={id + '+' + name}>
                {name}
              </option>
            ))}
          </select>
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
          <select
            className={`form-control ${getError(
              errors?.overview?.categoryCost
            )}`}
            {...register('overview.categoryCost', {
              required: true
            })}
            onChange={({ target }) => onChangeCategoryCost(target.value)}
          >
            <option className="disable" selected={true} disabled>
              selecione
            </option>
            {loadCategoriesCost()
              .filter(({ parent_id }) => parent_id === null)
              .map(({ id, name }) => (
                <option key={id} value={id + '+' + name}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Subcategoria de custo"
            message="selecione o subcategoria de custo"
          />
          {console.log()}
          <select
            className={`form-control ${getError(
              errors?.overview?.subcategoryCost
            )}`}
            {...register('overview.subcategoryCost', {
              required: true
            })}
          >
            <option className="disable" selected={true} disabled>
              selecione
            </option>
            {subCategoryCost.length >= 0 &&
              subCategoryCost.map(({ name, id }) => (
                <option key={id} value={id + '+' + name}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Possui variação?"
            message="selecione se existe variação"
          />
          {console.log()}
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
