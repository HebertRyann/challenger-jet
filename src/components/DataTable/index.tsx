import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import TableHeader from './Header';
import Pagination from './Pagination';
import Search from './Search';

import '../../assets/global/plugins/datatables/datatables.min.css';
import Modal from '../Modal';
import { FormCategory } from '../../pages/Warehouse/ProductCategories/components/Form';
import { useToast } from '../../hooks/toast';
import { Alert } from '../Alert';

interface Action {
  name: string;
  icon: string;
  title: string;
}

interface Header {
  name: string;
  field: string;
  sortable: boolean;
}

interface SearchParameters {
  [key: string]: string;
}

interface DataTableProps {
  entity: string;
  source: string;
  headers?: Header[];
  actions?: Action[];
  notHasChildren?: boolean;
  searchParameters?: SearchParameters[];
  isUpdateTable?: boolean;
  actionsButtons?: {
    onClickEdit?: 'to' | 'modal';
  };
}

const DataTable: React.FC<DataTableProps> = ({
  entity,
  source,
  notHasChildren,
  headers = [
    { name: 'Data', field: 'created_at', sortable: true },
    { name: 'Descrição', field: 'descriptions', sortable: true },
  ],
  actions,
  searchParameters,
  isUpdateTable,
  actionsButtons,
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ItemsPerPage, setItemsPerPage] = useState(50);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [isOpenModaEdit, setIsOpenModaEdit] = useState(false);
  const [idEditItem, setIdEditItem] = useState('');
  const [valueEditItem, setValueEditItem] = useState('');
  const [parentIdEditItem, setParentIdEditItem] = useState('');
  const refModal = useRef(null);
  const handleClickButtonEditOpenInModal = useCallback(
    (item: any) => {
      setIdEditItem(item.id);
      setValueEditItem(item.name);
      setParentIdEditItem(item.parent_id);
      setIsOpenModaEdit(true);
    },
    [idEditItem, valueEditItem, parentIdEditItem],
  );

  const handleClickOnClose = useCallback(() => {
    setIsOpenModaEdit(false);
  }, [isUpdateTable, isOpenModaEdit]);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get('dataTable', {
        params: {
          entity,
          source,
          keyword: search,
          page: currentPage,
          perPage: ItemsPerPage,
          orderByField: sorting.field,
          orderBySort: sorting.order,
          searchParameters,
        },
      });
      setItems(response.data.items);
      setTotalItems(response.data.totalItens);
      setCurrentPage(response.data.page);
    };
    getData();
  }, [
    entity,
    source,
    searchParameters,
    currentPage,
    search,
    sorting,
    ItemsPerPage,
    isUpdateTable,
  ]);

  const firstItem =
    totalItems === 0 ? totalItems : ItemsPerPage * (currentPage - 1) + 1;
  const lastItem =
    firstItem + ItemsPerPage - 1 >= totalItems
      ? totalItems
      : firstItem + ItemsPerPage - 1;

  const history = useHistory();

  const [isActiveAlert, setIsActiveAlert] = useState(false);

  const { addToast } = useToast();

  const [idDeleteItem, setIdDeleteItem] = useState('');

  const handlerOpenAlert = useCallback(
    (id: string) => {
      setIdDeleteItem(id);
      setIsActiveAlert(true);
    },
    [isActiveAlert, idDeleteItem],
  );

  const handlerClickButtonCancellAlert = useCallback(() => {
    setIsActiveAlert(false);
    addToast({
      type: 'info',
      title: 'Operação cancelada.',
    });
  }, [isActiveAlert]);

  const handlerClickButtonConfirmAlert = useCallback(async () => {
    try {
      await api.delete(`/productCategories/${idDeleteItem}`);
      setIsActiveAlert(false);
      addToast({
        type: 'success',
        title: 'Categoria removida com sucesso.',
      });
    } catch (err) {
      setIsActiveAlert(false);
      addToast({
        type: 'error',
        title: 'Categoria não removida, pois ainda está sendo usada.',
      });
    }
  }, [isActiveAlert, idDeleteItem]);

  return (
    <div className="dataTables_wrapper no-footer">
      <div className="row">
        <div className="col-md-6 col-sm-6">
          <div className="dataTables_length">
            <label>
              <select
                onChange={e => setItemsPerPage(Number(e.target.value))}
                className="form-control input-sm input-xsmall input-inline"
              >
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>{' '}
              resultados por página
            </label>
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="dataTables_filter">
            <label>
              Pesquisar
              <Search
                onSearch={value => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="table-scrollable">
        <table className="dataTable table table-striped table-bordered table-hover dt-responsive dtr-inline">
          <TableHeader
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {(items.length > 0 &&
              items.map(item => {
                return !notHasChildren ? (
                  <tr key={item.id}>
                    {headers.map(
                      header =>
                        (header.field !== 'actions' && (
                          <td key={`${header.field}-${item.id}`}>
                            <p
                              style={{
                                textAlign: 'left',
                              }}
                            >
                              {item[header.field]}
                            </p>
                          </td>
                        )) || (
                          <td key={`actions-${item.id}`} className="actions">
                            {(actions &&
                              actions.map(action => (
                                <Link
                                  key={Math.random()}
                                  title="Visualizar"
                                  to={`/${source}/${action.name}/${item.id}`}
                                >
                                  <span className={action.icon} />
                                </Link>
                              ))) || (
                              <>
                                {!item.parent_id && (
                                  <a
                                    key={Math.random()}
                                    title="Visualizar"
                                    onClick={() => {
                                      history.push(
                                        `/${source}/view/${item.id}`,
                                        {
                                          id: item.id,
                                          value: item.name,
                                        },
                                      );
                                    }}
                                  >
                                    <span className="fa fa-search" />
                                  </a>
                                )}
                                <div>
                                  <a
                                    key={Math.random()}
                                    title="Editar"
                                    onClick={() => {
                                      if (
                                        actionsButtons?.onClickEdit === 'modal'
                                      ) {
                                        handleClickButtonEditOpenInModal(item);
                                      } else {
                                        history.push(
                                          `/${source}/update/${item.id}`,
                                          {
                                            id: item.id,
                                            value: item.name,
                                          },
                                        );
                                      }
                                    }}
                                  >
                                    <span className="fa fa-edit" />
                                  </a>
                                  <a
                                    key={Math.random()}
                                    title="Remover"
                                    onClick={() => {
                                      handlerOpenAlert(item.id);
                                    }}
                                  >
                                    <span className="fa fa-remove" />
                                  </a>
                                </div>
                              </>
                            )}
                          </td>
                        ),
                    )}
                  </tr>
                ) : (
                  !item.parent_id && (
                    <tr key={item.id}>
                      {headers.map(
                        header =>
                          (header.field !== 'actions' && (
                            <td key={`${header.field}-${item.id}`}>
                              <p
                                style={{
                                  textAlign: 'left',
                                }}
                              >
                                {item[header.field]}
                              </p>
                            </td>
                          )) || (
                            <td key={`actions-${item.id}`} className="actions">
                              {(actions &&
                                actions.map(action => (
                                  <Link
                                    key={Math.random()}
                                    title="Visualizar"
                                    to={`/${source}/${action.name}/${item.id}`}
                                  >
                                    <span className={action.icon} />
                                  </Link>
                                ))) || (
                                <>
                                  {!item.parent_id && (
                                    <a
                                      key={Math.random()}
                                      title="Visualizar"
                                      onClick={() => {
                                        history.push(
                                          `/${source}/view/${item.id}`,
                                          {
                                            id: item.id,
                                            value: item.name,
                                          },
                                        );
                                      }}
                                    >
                                      <span className="fa fa-search" />
                                    </a>
                                  )}
                                  <a
                                    key={Math.random()}
                                    title="Editar"
                                    onClick={() => {
                                      history.push(
                                        `/${source}/update/${item.id}`,
                                        {
                                          id: item.id,
                                          value: item.name,
                                        },
                                      );
                                    }}
                                  >
                                    <span className="fa fa-edit" />
                                  </a>
                                </>
                              )}
                            </td>
                          ),
                      )}
                    </tr>
                  )
                );
              })) || (
              <tr>
                <td colSpan={headers.length}>Nenhum registro encontrado</td>
              </tr>
            )}
          </tbody>
          <tfoot />
        </table>
      </div>
      <div className="row">
        <div className="col-md-5 col-sm-5">
          <div className="dataTables_info">
            Mostrando de {firstItem} até {lastItem} de {totalItems} registros
          </div>
        </div>
        <div className="col-md-7 col-sm-7">
          <div className="dataTables_paginate paging_bootstrap_number">
            <Pagination
              total={totalItems}
              itemsPerPage={ItemsPerPage}
              currentPage={currentPage}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
      <Modal
        refModal={refModal}
        onClickButtonCancel={handleClickOnClose}
        isOpenModal={isOpenModaEdit}
        pageTitle="Editar"
        Children={
          <FormCategory
            valueInput={valueEditItem}
            typeForm={{
              idUpdate: Number(idEditItem),
              inputValue: valueEditItem,
            }}
            isOpenInModal={{
              handleOnClose: handleClickOnClose,
              idParent: Number(parentIdEditItem),
            }}
          />
        }
      />
      <Alert
        message={`Tem certeza que deseja excluir o registro ${2} ?`}
        onClickCancellButton={handlerClickButtonCancellAlert}
        onClickConfirmButton={handlerClickButtonConfirmAlert}
        isActive={isActiveAlert}
      />
    </div>
  );
};

export default DataTable;
