import React from 'react';
import { Container } from './style';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
export const labelFiscal = 'Fiscal';
export const nameFiscal = '@@tabs-fiscal';

export const Fiscal = (): JSX.Element => {
  return (
    <>
      <Container className="row">
        <div className="form-content col-md-4">
          <TooltipComponent label="NCM" message="Infome o peso em kg" />
          <input
            className="form-control"
            type="text"
            placeholder="Digíte um código ou descrição NCM"
          />
        </div>
        <div className="form-content col-md-4">
          <TooltipComponent
            label="CEST"
            message="Digíte um código ou descrição CEST"
          />
          <input
            className="form-control"
            type="text"
            placeholder="Digíte um código ou descrição CEST"
          />
        </div>
        <div className="form-content col-md-4">
          <TooltipComponent
            label="Origem"
            message="Informe a altura em metros"
          />
          <input className="form-control" type="text" />
        </div>
      </Container>
      <Container className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Peso líquido"
            message="Infome o peso em kg"
          />
          <input className="form-control" type="text" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Peso bruto"
            message="Informe a largura em metros"
          />
          <input className="form-control" type="text" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Número FCI"
            message="Informe a altura em metros"
          />
          <input className="form-control" type="text" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="% Vr. aprox. tribut."
            message="Informe a comprimento em metros"
          />
          <input className="form-control" type="text" />
        </div>
      </Container>
      <Container>
        <hr />
        <div className="name-fisco">
          <h4>PIS / COFINS</h4>
        </div>
        <div className="row">
          <div className="form-content col-md-3">
            <TooltipComponent
              label="Valor fixo PIS"
              message="Infome o peso em kg"
            />
            <input className="form-control" type="text" />
          </div>
          <div className="form-content col-md-3">
            <TooltipComponent
              label="Valor fixo PIS ST"
              message="Informe a largura em metros"
            />
            <input className="form-control" type="text" />
          </div>
          <div className="form-content col-md-3">
            <TooltipComponent
              label="Valor fixo COFINS"
              message="Informe a altura em metros"
            />
            <input className="form-control" type="text" />
          </div>
          <div className="form-content col-md-3">
            <TooltipComponent
              label="Valor fixo COFINS ST"
              message="Informe a altura em metros"
            />
            <input className="form-control" type="text" />
          </div>
        </div>
      </Container>
    </>
  );
};
