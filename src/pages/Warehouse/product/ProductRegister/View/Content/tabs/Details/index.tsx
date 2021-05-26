import React, { useEffect, useState } from 'react';
import { genericMaskWithTwoZero } from '../../../../../../../../utlis/mask';
import {
  typeUnitMensuredDetails,
  typeUnitMensuredWeight,
} from '../../../../domain/details/measureds';
import { useProduct } from '../../../provider/productProvider';
import { Container } from './style';

type Details = {
  width: string;
  height: string;
  length: string;
  weight: string;
  thickness: string;
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
  }
  const [isEmpty, setEmpty] = useState(true);

  useEffect(() => {
    setEmpty(
      () =>
        detail.height === '0' &&
        detail.length === '0' &&
        detail.thickness === '0' &&
        detail.weight === '0' &&
        detail.width === '0' &&
        detail.measure_weight === '' &&
        detail.measure === '',
    );
  }, [detail]);

  const gettypeUnitMensuredDetails = (isEqual: string): string => {
    const match = typeUnitMensuredDetails.filter(
      ({ value }) => value === isEqual,
    );
    if (match && match[0]) return match[0].label;
    return isEqual;
  };

  const getTypeUnitMensuredWeight = (isEqual: string): string => {
    const match = typeUnitMensuredWeight.filter(
      ({ value }) => value === isEqual,
    );
    if (match && match[0]) return match[0].label;
    return isEqual;
  };

  return (
    <Container isEmpty={isEmpty}>
      <div className="row">
        {detail.measure_weight !== '' && (
          <div className="form-content col-md-3">
            <label htmlFor="Peso_medida">Peso medida</label>
            <p>{getTypeUnitMensuredWeight(detail.measure_weight)}</p>
          </div>
        )}
        {detail.length !== '0' && (
          <div className="form-content col-md-3">
            <label htmlFor="Peso">Peso</label>
            <p>{genericMaskWithTwoZero(detail?.weight)}</p>
          </div>
        )}
        {detail.measure && detail.measure !== '' && (
          <div className="form-content col-md-3">
            <label htmlFor="tipo do produto">Dimensão medida</label>
            <p>{gettypeUnitMensuredDetails(detail?.measure)}</p>
          </div>
        )}
        {detail.width !== '0' && (
          <div className="form-content col-md-3">
            <label htmlFor="tipo do produto">Largura</label>
            <p>{genericMaskWithTwoZero(detail.width)}</p>
          </div>
        )}
      </div>
      <div className="row">
        {detail.height !== '0' && (
          <div className="form-content col-md-3">
            <label htmlFor="tipo do produto">Altura</label>
            <p>{genericMaskWithTwoZero(detail.height)}</p>
          </div>
        )}
        {detail.length !== '0' && (
          <div className="form-content col-md-3">
            <label htmlFor="tipo do produto">Comprimento</label>
            <p>{genericMaskWithTwoZero(detail.length)}</p>
          </div>
        )}
        {detail.thickness !== '0' && detail.thickness && (
          <div className="form-content col-md-3">
            <label htmlFor="tipo do produto">Espessura</label>
            <p>{genericMaskWithTwoZero(detail.thickness)}</p>
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
