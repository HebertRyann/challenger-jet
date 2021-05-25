import React, { useEffect, useState } from 'react';
import { useProduct } from '../../../provider/productProvider';
import { Container } from './style';

type Details = {
  width: number;
  height: number;
  length: number;
  weight: number;
  thickness: number;
  measure: string;
  way_use: string;
  measure_weight: string;
  description_details: string;
  technical_specification: string;
};

export const Details = (): JSX.Element => {
  const { getProduct } = useProduct();
  const { details } = getProduct();
  let detail: Details = {} as Details;
  if (details) {
    detail = JSON.parse(details.toLowerCase());
    console.log(detail);
  }
  const [isEmpty, setEmpty] = useState(true);

  useEffect(() => {
    setEmpty(
      () =>
        detail.height === 0 &&
        detail.length === 0 &&
        detail.thickness === 0 &&
        detail.weight === 0 &&
        detail.width === 0 &&
        detail.measure_weight === '' &&
        detail.measure === '',
    );
  }, [detail]);

  return (
    <Container isEmpty={isEmpty}>
      <div className="flex">
        {detail.measure_weight !== '' && (
          <div className="form-content">
            <label htmlFor="Peso_medida">Peso medida</label>
            <p>{detail.measure_weight}</p>
          </div>
        )}
        {detail.length !== 0 && (
          <div className="form-content">
            <label htmlFor="Peso">Peso</label>
            <p>{detail.weight?.toFixed(2)}</p>
          </div>
        )}
        {detail.measure && detail.measure !== '' && (
          <div className="form-content">
            <label htmlFor="tipo do produto">Dimensão medida</label>
            <p>{detail.measure}</p>
          </div>
        )}
        {detail.width !== 0 && (
          <div className="form-content">
            <label htmlFor="tipo do produto">Largura</label>
            <p>{detail.width?.toFixed(2)}</p>
          </div>
        )}
        {detail.height !== 0 && (
          <div className="form-content">
            <label htmlFor="tipo do produto">Altura</label>
            <p>{detail.height?.toFixed(2)}</p>
          </div>
        )}
        {detail.length !== 0 && (
          <div className="form-content">
            <label htmlFor="tipo do produto">Comprimento</label>
            <p>{detail.length?.toFixed(2)}</p>
          </div>
        )}
        {detail.thickness !== 0 && detail.thickness && (
          <div className="form-content">
            <label htmlFor="tipo do produto">Espessura</label>
            <p>{detail.thickness?.toFixed(2)}</p>
          </div>
        )}
      </div>
      <hr />
      <div className="section">
        <div className="text-area row">
          <div className="form-content col-md-12 item">
            <label htmlFor="tipo do produto">Descrição e detalhes</label>
            <p>{detail.description_details}</p>
          </div>
        </div>
        <div className="text-area row">
          <div className="form-content col-md-12 item">
            <label htmlFor="tipo do produto">Especificação Técnica</label>
            <p>{detail.technical_specification}</p>
          </div>
        </div>
        <div className="text-area row">
          <div className="form-content col-md-12 item">
            <label htmlFor="tipo do produto">Forma de utilização</label>
            <p>{detail.way_use}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export const labelDetails = 'Detalhe e medida';
export const nameDetails = '@@tabs-view-details';
