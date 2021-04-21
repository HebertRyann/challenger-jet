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

  if (getProduct().stocks) {
    return (
      <div>
        {stocks.map(
          ({ current_stock, replacement_point, details, atributes }) => {
            let unitMensured: { unit_mensured: { name: string } } = {
              unit_mensured: { name: '' },
            };

            if (details) {
              unitMensured = JSON.parse(details);
            }

            let atributeList: Atributes[] = [];

            if (atributes) {
              atributeList = JSON.parse(atributes?.toLowerCase());
            }

            return (
              <Container>
                <div className="row">
                  <div className="form-content col-md-3">
                    <label htmlFor="Peso">Unidade de medidas</label>
                    <p>{unitMensured.unit_mensured.name}</p>
                  </div>
                  <div className="form-content col-md-4">
                    <label htmlFor="tipo do produto">Estoque atual</label>
                    <p>{current_stock}</p>
                  </div>
                  <div className="form-content col-md-4">
                    <label htmlFor="tipo do produto">Ponto de reposição</label>
                    <p>{replacement_point}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  {atributeList.map(({ id, key, value, parent_id }) => {
                    return (
                      <div className="form-content col-md-4">
                        <label htmlFor="tipo do produto">
                          {parent_id === null && key}
                        </label>
                        <p>{parent_id === id ? 'r' : value}</p>
                        {console.log(id)}
                      </div>
                    );
                  })}
                </div>
              </Container>
            );
          },
        )}
      </div>
    );
  }

  return <div></div>;
};

export const labelHasVariation = 'Estoque/Variação';
export const nameHasVariation = '@@tabs-view-has-variations';
