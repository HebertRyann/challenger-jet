import React, { useEffect } from 'react';
import { useTabs } from '../../../../../../../../hooks/tabs';
import { useProduct } from '../../../provider/productProvider';
import { Container } from './styles';
import { nameStock } from '../../tabs/Stock';
import { Atributes } from '../../../domain/response/productResponse';

export const HasVariation = (): JSX.Element => {
  const { disableTab, activeTab } = useTabs();
  const { getProduct } = useProduct();
  const { stocks } = getProduct();

  useEffect(() => {
    if (stocks) {
      if (stocks.length > 1) {
        disableTab(nameStock);
        activeTab(nameHasVariation);
      }
      if (stocks[0].atributes) {
        disableTab(nameStock);
        activeTab(nameHasVariation);
      }
    }
  }, [getProduct()]);

  const renderThAtributes = (): JSX.Element[] => {
    let atributesList: Atributes[] = [];

    if (stocks[0].atributes) {
      atributesList = JSON.parse(stocks[0].atributes);
    }

    const capitalizeFirstLetter = (value: string) =>
      value?.[0].toUpperCase() + value?.toLowerCase().substring(1);

    return atributesList.map(({ key }) => (
      <th key={key} className="title">
        {capitalizeFirstLetter(key)}
      </th>
    ));
  };

  if (getProduct().stocks) {
    return (
      <Container className="table table-bordered margin-bottom-0">
        <thead>
          <tr>
            <th className="title">Unidade de medidas</th>
            {renderThAtributes()}
            <th className="title">Estoque atual</th>
            <th className="title">Ponto de reposição</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(
            ({ current_stock, replacement_point, details, atributes }) => {
              let unitmensured: { unit_mensured: { name: string } } = {
                unit_mensured: { name: '' },
              };

              let atributesList: Atributes[] = [];

              if (details) {
                unitmensured = JSON.parse(details);
              }

              if (atributes) {
                atributesList = JSON.parse(atributes);
              }

              return (
                <tr className="items">
                  <td>{unitmensured.unit_mensured.name}</td>
                  {atributesList.map(({ value }) => (
                    <td>{value}</td>
                  ))}
                  <td>{current_stock}</td>
                  <td>{replacement_point}</td>
                </tr>
              );
            },
          )}
        </tbody>
      </Container>
    );
  }
  return <div></div>;
};

export const labelHasVariation = 'Estoque/Variação';
export const nameHasVariation = '@@tabs-view-has-variations';
