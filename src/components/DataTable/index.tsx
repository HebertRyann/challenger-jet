import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import TableHeader from './Header'
import Pagination from './Pagination'
import Search from './Search'
import '../../assets/global/plugins/datatables/datatables.min.css'
import { LinkContainer } from './style'
interface Action {
  name: string
  icon: string
  title: string
}

interface Header {
  name: string
  field: string
  sortable: boolean
}

interface SearchParameters {
  [key: string]: string
}

interface DataTableProps {
  onActions?: {
    onClickButtonEdit?: <T>(currentValue: T | any) => void
    onClickButtonRemove?: <T>(currentValue: T | any) => void
    onClickButtonList?: <T>(currentValue: T | any) => void
  }
  entity: string
  source: string
  headers?: Header[]
  actions?: Action[]
  notHasChildren?: boolean
  onlyParent?: boolean
  parentId?: string
  searchParameters?: SearchParameters[]
  format: {
    orderBy: string
  }
}

const DataTable = ({
  onActions,
  entity,
  source,
  notHasChildren,
  onlyParent,
  headers = [
    { name: 'Data', field: 'created_at', sortable: true },
    { name: 'Descrição', field: 'descriptions', sortable: true }
  ],
  actions,
  format,
  parentId
}: DataTableProps): JSX.Element => {
  const [items, setItems] = useState<any[]>([])
  const [filterItems, setFilterItems] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [ItemsPerPage, setItemsPerPage] = useState(50)
  const history = useHistory()

  const handlerOnClickButtonList = (currentValue: any) => {
    if (typeof onActions?.onClickButtonList === 'function') {
      onActions.onClickButtonList(currentValue)
    } else {
      history.push(`/${source}/view/${currentValue.id}`, {
        id: currentValue.id,
        value: currentValue.name
      })
    }
  }

  const handlerOnClickButtonEdit = (currentValue: any) => {
    if (onActions?.onClickButtonEdit) {
      onActions.onClickButtonEdit(currentValue)
    } else {
      history.push(`/${source}/update/${currentValue.id}`, {
        id: currentValue.id,
        value: currentValue.name
      })
    }
  }

  const handlerOnClickButtonRemove = (currentValue: any) => {
    if (onActions?.onClickButtonRemove) {
      onActions.onClickButtonRemove(currentValue)
    }
  }

  const loadParams = useCallback(() => {
    const params = {
      entity,
      source,
      keyword: '',
      page: currentPage,
      perPage: ItemsPerPage,
      orderByField: '',
      searchParameters: '',
      onlyParent,
      orderBy: format.orderBy,
      parentId
    }

    if (!parentId) Object.assign(params, { parentId: '' })

    return params
  }, [
    ItemsPerPage,
    currentPage,
    entity,
    format.orderBy,
    onlyParent,
    parentId,
    source
  ])

  useEffect(() => {
    ;(async () => {
      try {
        const params = loadParams()
        const response = await api.get('dataTable', { params })
        setItems(response.data.items)
        setFilterItems(response.data.items)
        setTotalItems(response.data.totalItens)
        setCurrentPage(response.data.page)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [loadParams])

  const firstItem =
    totalItems === 0 ? totalItems : ItemsPerPage * (currentPage - 1) + 1

  const getTotalItems = (initialValue: number): number => {
    let sum = 0
    if (initialValue > 1) {
      return items.length + initialValue - 1
    } else {
      if (notHasChildren) {
        sum = items.reduce((sum, value) => {
          if (!value.parent_id) {
            return sum + 1
          }
          return sum
        }, 0)
      } else {
        sum = items.length
      }
    }
    return sum
  }

  const onSearchItem = (value: string) => {
    if (value.length === 0) {
      setItems(filterItems)
      return
    }
    if (items && items.length > 0) {
      const itemsFilter = items.filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase())
      )
      setItems(itemsFilter)
      return
    }
    setItems(filterItems)
  }

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
              <Search onSearch={value => onSearchItem(value)} />
            </label>
          </div>
        </div>
      </div>
      <div className="table-scrollable">
        <table className="dataTable table table-striped table-bordered table-hover dt-responsive dtr-inline">
          <TableHeader
            headers={headers}
            onSorting={() => {
              const itemSorted = items.sort(() => -1)
              setItems([...itemSorted])
            }}
          />
          <tbody>
            {(items.length > 0 &&
              items.map(item => {
                if (item?.type) {
                  if (item.type === 'CONSUMO') {
                    item.type = 'USO E CONSUMO'
                  }
                }
                return !notHasChildren ? (
                  <tr key={item.id}>
                    {headers.map(
                      header =>
                        (header.field !== 'actions' && (
                          <td key={`${header.field}-${item.id}`}>
                            <p
                              style={{
                                textAlign: 'left'
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
                              <LinkContainer>
                                {!item.parent_id && (
                                  <div
                                    className="link"
                                    key={Math.random()}
                                    title="Visualizar"
                                    onClick={() =>
                                      handlerOnClickButtonList(item)
                                    }
                                  >
                                    <span className="fa fa-search" />
                                  </div>
                                )}
                                <div>
                                  <div
                                    className="link"
                                    key={Math.random()}
                                    title="Editar"
                                    onClick={() => {
                                      handlerOnClickButtonEdit(item)
                                    }}
                                  >
                                    <span className="fa fa-edit" />
                                  </div>
                                  <div
                                    key={Math.random()}
                                    title="Remover"
                                    className="link"
                                    onClick={() => {
                                      handlerOnClickButtonRemove(item)
                                    }}
                                  >
                                    <span className="fa fa-remove" />
                                  </div>
                                </div>
                              </LinkContainer>
                            )}
                          </td>
                        )
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
                                  textAlign: 'left'
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
                                <LinkContainer>
                                  {!item.parent_id && (
                                    <div
                                      className="link"
                                      key={Math.random()}
                                      title="Visualizar"
                                      onClick={() => {
                                        handlerOnClickButtonList(item)
                                      }}
                                    >
                                      <span className="fa fa-search" />
                                    </div>
                                  )}
                                  <div
                                    className="link"
                                    key={Math.random()}
                                    title="Editar"
                                    onClick={() => {
                                      handlerOnClickButtonEdit(item)
                                    }}
                                  >
                                    <span className="fa fa-edit" />
                                  </div>
                                </LinkContainer>
                              )}
                            </td>
                          )
                      )}
                    </tr>
                  )
                )
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
            Mostrando de {firstItem} até {getTotalItems(firstItem)} de{' '}
            {totalItems} registros
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
    </div>
  )
}

export default DataTable
