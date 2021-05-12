import React, { useCallback, useEffect, useState } from 'react';
import { Container, FooterStyled, IconRemove } from './style';
import { NewInput } from '../../../../../../../../../components/NewInput';
import { useTabCreate } from '../../../../providers/tabsProvider';
import { useTabs } from '../../../../../../../../../hooks/tabs';
import { loadProductByType } from '../../../../services/api/loadProductByType';
import { nameHasComposition } from '..';
import {
  CONSUMER,
  RE_SALE,
  SALE,
  SEMI_FINISHED,
  formatProductTypeToLowerCase,
} from '../../../../domain/products';
import { RAW_MATERIAL } from '../../../../domain/products';
import { useLoading } from '../../../../../../../../../hooks/loading';
import { SearchComponentHasComposition } from '../SearchComponent';
import { useToast } from '../../../../../../../../../hooks/toast';

type ProductByTypeSelected = {
  id: string;
  name: string;
};

export const Table = (): JSX.Element => {
  const { activeLoading, disableLoading } = useLoading();
  const [alert, setAlert] = useState(false);
  const { addToast } = useToast();
  const [productListByTypeSelected, setProductListByTypeSelected] = useState<
    ProductByTypeSelected[]
  >([]);
  const [
    productListByTypeSelectedSearch,
    setProductListByTypeSelectedSearch,
  ] = useState<ProductByTypeSelected[]>([]);

  const { composition, overview } = useTabCreate();
  const { loadCurrentTab } = useTabs();
  const products = composition.getData();
  const { typeSelectProdut } = overview.getData();
  const {
    removeComposition,
    addComposition,
    changeInputNameProduct,
    changeInputAmount,
    changeInputCost,
    changeInputProductIdAndStockId,
    loadInputProductIdAndStockId,
  } = composition.setData;

  const [total, setTotal] = useState(0);
  const [activeSearch, setActiveSearch] = useState<boolean[]>([false]);

  useEffect(() => {
    let soma = 0;
    for (let i = 0; i < products.length; i++) {
      const subtotal =
        Number(products[i].amount.value) * Number(products[i].cost.value);
      soma += subtotal;
    }
    setTotal(soma);
  }, [products]);

  const handleClickAddComposition = () => {
    addComposition();
    setActiveSearch(prevState => prevState.map(() => false));
  };

  const formatProductName = (product: string): string =>
    product.replace(' ', '-').toLowerCase();

  useEffect(() => {
    (async () => {
      try {
        if (loadCurrentTab().key === nameHasComposition) {
          if (typeSelectProdut.value.name === SEMI_FINISHED.name) {
            activeLoading();
            const productsTypeRawMaterial = await loadProductByType(
              formatProductTypeToLowerCase(RAW_MATERIAL),
            );
            const productsTypeConsumer = await loadProductByType(
              formatProductTypeToLowerCase(CONSUMER),
            );
            setProductListByTypeSelected([
              ...productsTypeRawMaterial,
              ...productsTypeConsumer,
            ]);
            setProductListByTypeSelectedSearch(productListByTypeSelected);
            disableLoading();
            return;
          }
          if (
            formatProductName(typeSelectProdut.value.name) ===
            formatProductTypeToLowerCase(SALE)
          ) {
            activeLoading();
            const productsTypeReSale = await loadProductByType(
              formatProductTypeToLowerCase(RE_SALE),
            );
            setProductListByTypeSelected(productsTypeReSale);
            setProductListByTypeSelectedSearch(productListByTypeSelected);
            disableLoading();
          }
        }
      } catch (error) {
        disableLoading();
        addToast({ title: 'Lista de produto não carregada' });
      }
    })();
  }, [typeSelectProdut.value, loadCurrentTab().key]);

  const handlerChangeNameProduct = (value: string, index: number) => {
    changeInputNameProduct(value, index);
    if (value.length) {
      const matchList = productListByTypeSelected.filter(({ id, name }) => {
        const regex = new RegExp(`^${value}`, 'gi');
        return name.match(regex);
      });

      if (value === '') {
        setProductListByTypeSelectedSearch([]);
        setActiveSearch(prevState => prevState.map(() => false));
      }

      if (matchList.length > 0) {
        setProductListByTypeSelectedSearch(matchList);
        setActiveSearch(prevState => {
          prevState = prevState.map(() => false);
          prevState[index] = true;
          return prevState;
        });
      } else {
        setActiveSearch(prevState => {
          prevState[index] = false;
          return [...prevState];
        });
        setProductListByTypeSelectedSearch(productListByTypeSelected);
      }
      return;
    }
    setActiveSearch(prevState => {
      prevState[index] = false;
      return [...prevState];
    });
  };

  const handlerClickRowSearch = ({
    product,
    index,
  }: {
    product: any;
    index: number;
  }) => {
    handlerChangeNameProduct(product.name, index);
    changeInputProductIdAndStockId(product.product_id, product.stock_id, index);
    setActiveSearch(prevState => {
      prevState[index] = true;
      return [...prevState];
    });
  };

  return (
    <Container className="table-responsive">
      <div className="table-content-relative">
        <table className="table table-bordered margin-bottom-0">
          <tbody>
            <tr>
              <th style={{ width: '50%' }}>Produto</th>
              <th>Quantidade</th>
              <th>Custo</th>
              <th>Subtotal</th>
              <th>Ações</th>
            </tr>
            {products &&
              products.map(({ amount, cost, nameProduct, subtotal }, index) => (
                <tr
                  style={{
                    height: '10px',
                  }}
                >
                  <td>
                    <NewInput
                      search={true}
                      name="nameProduct"
                      placeholder="Informe o nome do produto"
                      className="form-control"
                      type="text"
                      value={nameProduct.value}
                      error={nameProduct.error}
                      onChange={event =>
                        handlerChangeNameProduct(event.target.value, index)
                      }
                      RenderSearchComponent={() => (
                        <SearchComponentHasComposition
                          active={activeSearch[index]}
                          data={productListByTypeSelectedSearch}
                          onClickRow={(product: any) =>
                            handlerClickRowSearch({ product, index })
                          }
                        />
                      )}
                    />
                  </td>
                  <td>
                    <NewInput
                      name="amount"
                      value={amount.value}
                      error={amount.error}
                      placeholder="0"
                      isNumber
                      onChange={event => {
                        changeInputAmount(event.currentTarget.value, index);
                        setActiveSearch(prevState => {
                          prevState[index] = false;
                          return [...prevState];
                        });
                        console.log(activeSearch);
                      }}
                      className="form-control"
                      type="text"
                    />
                  </td>
                  <td>
                    <NewInput
                      name="cost"
                      value={cost.value}
                      error={cost.error}
                      placeholder="0.00"
                      isNumber
                      onChange={event =>
                        changeInputCost(event.currentTarget.value, index)
                      }
                      className="form-control"
                      type="text"
                    />
                  </td>
                  <td>
                    <NewInput
                      name="subtotal"
                      disabled
                      value={(
                        Number(amount.value) * Number(cost.value)
                      ).toFixed(2)}
                      error={subtotal.error}
                      placeholder="0.00"
                      className="form-control"
                      type="text"
                    />
                  </td>
                  <input
                    type="hidden"
                    name="product_id"
                    value={loadInputProductIdAndStockId()[index].productId}
                  />
                  <input
                    type="hidden"
                    name="stock_id"
                    value={loadInputProductIdAndStockId()[index].stockId}
                  />
                  <td className="actions">
                    <IconRemove
                      onClick={() => {
                        removeComposition(index);
                        setActiveSearch(prevState =>
                          prevState.map(() => false),
                        );
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <hr />
      <FooterStyled>
        <button
          onClick={() => handleClickAddComposition()}
          className="btn dark btn-sm sbold uppercase"
        >
          <span
            className="fa fa-plus"
            aria-hidden="true"
            style={{ marginRight: '5px' }}
          />
          produto
        </button>
        <div>
          <h4>Total</h4>
          <h6>{total.toFixed(2)}</h6>
        </div>
      </FooterStyled>
    </Container>
  );
};
