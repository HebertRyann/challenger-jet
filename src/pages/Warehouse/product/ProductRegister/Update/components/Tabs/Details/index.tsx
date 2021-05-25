import React from 'react';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import { Container, TextArea } from './style';
import { NewInput } from '../../../../../../../../components/NewInput';
import {
  genericMaskWithTwoZero,
  numericMask,
  weightMask,
} from '../../../../../../../../utlis/mask';
import { useTabCreate } from '../../../providers/tabsProvider';
import { NewSelect } from '../../../../../../../../components/NewSelect';

const typeUnitMensuredDetails: { value: string; label: string }[] = [
  {
    label: 'Metro',
    value: 'm',
  },
  {
    label: 'Centímetro',
    value: 'cm',
  },
  {
    label: 'Milimetro',
    value: 'mm',
  },
];

const typeUnitMensuredWeight: { value: string; label: string }[] = [
  {
    label: 'Tonelada',
    value: 't',
  },
  {
    label: 'Quilograma',
    value: 'kg',
  },
  {
    label: 'Grama',
    value: 'g',
  },
];

const gettypeUnitMensuredDetails = (isEqual: string): string => {
  const match = typeUnitMensuredDetails.filter(
    ({ value }) => value === isEqual,
  );
  if (match && match[0]) return match[0].label;
  return 'Selecione';
};

const getTypeUnitMensuredWeight = (isEqual: string): string => {
  const match = typeUnitMensuredWeight.filter(({ value }) => value === isEqual);
  if (match && match[0]) return match[0].label;
  return 'Selecione';
};

export const Details = (): JSX.Element => {
  const { details } = useTabCreate();
  console.log(details.getData());
  const {
    weight,
    width,
    height,
    length,
    descriptionAndDetails,
    technicalSpecification,
    wayOfUse,
    measure,
    measureWeight,
    thickness,
  } = details.getData();

  return (
    <Container>
      <div className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Peso medida"
            message="Selecione a Medida de dimensão"
          />
          <NewSelect
            isSelected={getTypeUnitMensuredWeight(measureWeight.value)}
            error={{ isError: false }}
            onChange={event => {
              const split = event.target.value.split('+');
              details.setData({
                ...details.getData(),
                weight: { error: { isError: false }, value: split[1] },
              });
            }}
          >
            {typeUnitMensuredWeight.map(({ label, value }) => {
              return <option value={`${label}+${value}`}>{label}</option>;
            })}
          </NewSelect>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent label="Peso" message="Infome o peso em kg" />
          <NewInput
            isNumber
            value={genericMaskWithTwoZero(weight.value)}
            onChange={e =>
              details.setData({
                ...details.getData(),
                weight: { error: { isError: false }, value: e.target.value },
              })
            }
            error={weight.error}
            name="peso"
            className="form-control"
            type="text"
            maxLength={12}
            placeholder="0,00"
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Dimensão medida"
            message="Selecione a Medida de dimensão"
          />
          <NewSelect
            isSelected={gettypeUnitMensuredDetails(measure.value)}
            error={{ isError: false }}
            onChange={event => {
              const split = event.target.value.split('+');
              details.setData({
                ...details.getData(),
                width: { error: { isError: false }, value: split[1] },
              });
            }}
          >
            {typeUnitMensuredDetails.map(({ label, value }) => {
              return <option value={`${label}+${value}`}>{label}</option>;
            })}
          </NewSelect>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Largura"
            message="Informe a largura em metros"
          />
          <NewInput
            isNumber
            maxLength={12}
            value={genericMaskWithTwoZero(width.value)}
            onChange={e =>
              details.setData({
                ...details.getData(),
                width: { error: { isError: false }, value: e.target.value },
              })
            }
            error={width.error}
            name="largura"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-content col-md-4">
          <TooltipComponent
            label="Altura"
            message="Informe a altura em metros"
          />
          <NewInput
            isNumber
            maxLength={12}
            value={genericMaskWithTwoZero(height.value)}
            onChange={e =>
              details.setData({
                ...details.getData(),
                height: { error: { isError: false }, value: e.target.value },
              })
            }
            error={height.error}
            name="altura"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </div>
        <div className="form-content col-md-4">
          <TooltipComponent
            label="Comprimento"
            message="Informe a comprimento em metros"
          />
          <NewInput
            isNumber
            maxLength={12}
            value={genericMaskWithTwoZero(length.value)}
            onChange={e =>
              details.setData({
                ...details.getData(),
                length: { error: { isError: false }, value: e.target.value },
              })
            }
            error={length.error}
            name="comprimento"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </div>
        <div className="form-content col-md-4">
          <TooltipComponent label="Espessura" message="Infome a esperssura" />
          <NewInput
            isNumber
            value={genericMaskWithTwoZero(thickness.value)}
            onChange={e =>
              details.setData({
                ...details.getData(),
                thickness: { error: { isError: false }, value: e.target.value },
              })
            }
            error={weight.error}
            name="peso"
            className="form-control"
            type="text"
            maxLength={12}
            placeholder="0,00"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-content col-md-12">
          <div className="form-group">
            <label>Descrição e detalhes</label>
            <TextArea
              isError={descriptionAndDetails.error.isError}
              onChange={e =>
                details.setData({
                  ...details.getData(),
                  descriptionAndDetails: {
                    error: { isError: false },
                    value: e.target.value,
                  },
                })
              }
              value={details.getData().descriptionAndDetails.value}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="form-content col-md-12">
          <div className="form-group">
            <label>Especificação Técnica</label>
            <TextArea
              isError={technicalSpecification.error.isError}
              onChange={e =>
                details.setData({
                  ...details.getData(),
                  technicalSpecification: {
                    error: { isError: false },
                    value: e.target.value,
                  },
                })
              }
              className="form-control"
              value={details.getData().technicalSpecification.value}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="form-content col-md-12">
          <div className="form-group">
            <label>Forma de utilização</label>
            <TextArea
              isError={wayOfUse.error.isError}
              onChange={e =>
                details.setData({
                  ...details.getData(),
                  wayOfUse: {
                    error: { isError: false },
                    value: e.target.value,
                  },
                })
              }
              className="form-control"
              value={details.getData().wayOfUse.value}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export const labelDetails = 'Detalhe e medida';
export const nameDetails = '@@tabs-details';
