import React, { useState } from 'react';

interface TableHeadProps {
  headers: {
    name: string;
    field: string;
    sortable: boolean;
  }[];
  onSorting(field: string, order: string): void;
}

const TableHeader: React.FC<TableHeadProps> = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState('');
  const [sortingOrder, setSortingOrder] = useState('ASC');

  const onSortingChange = (field: string) => {
    const order =
      field === sortingField && sortingOrder === 'ASC' ? 'DESC' : 'ASC';

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => {
          const classSort =
            (sortingField &&
              sortingField === field &&
              (sortingOrder === 'ASC' ? 'sorting_asc' : 'sorting_desc')) ||
            (sortable && 'sorting') ||
            '';

          const classAction = field === 'actions' ? 'actions' : '';

          const className = classSort + classAction;
          return (
            <th
              key={name}
              onClick={() => (sortable ? onSortingChange(field) : null)}
              className={className}
            >
              {name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
export default TableHeader;
