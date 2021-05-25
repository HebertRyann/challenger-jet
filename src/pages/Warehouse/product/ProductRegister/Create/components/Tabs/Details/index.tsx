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
    label: 'Centímetro',
    value: 'cm',
  },
  {
    label: 'Metro',
    value: 'm',
  },

  {
    label: 'Milimetro',
    value: 'mm',
  },
];

export const Details = (): JSX.Element => {
  const { details } = useTabCreate();

  const {
    weight,
    width,
    height,
    length,
    descriptionAndDetails,
    technicalSpecification,
    wayOfUse,
  } = details.getData();

  return (
    <Container>
      <div className="row">
        <div className="form-content col-md-2">
          <TooltipComponent label="Peso (kg)" message="Infome o peso em kg" />
          <NewInput
            isNumber
            value={weightMask(weight.value)}
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
        <div className="form-content col-md-2">
          <TooltipComponent
            label="Medida"
            message="Selecione a Medida de dimensão"
          />
          <NewSelect
            error={{ isError: false }}
            onChange={event => {
              const split = event.target.value.split('+');
              const id = split[0];
              const name = split[1];
            }}
          >
            {typeUnitMensuredDetails.map(({ value, label }) => (
              <option key={Math.random()} value={value}>
                {label}
              </option>
            ))}
          </NewSelect>
        </div>
        <div className="form-content col-md-2">
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
        <div className="form-content col-md-2">
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
        <div className="form-content col-md-2">
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
        <div className="form-content col-md-2">
          <TooltipComponent label="Espessura" message="Infome a esperssura" />
          <NewInput
            isNumber
            value={weightMask(weight.value)}
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
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export const labelDetails = 'Detalhe e medida';
export const nameDetails = '@@tabs-details';
