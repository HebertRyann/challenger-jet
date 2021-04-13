import React from 'react';

export const HeaderCreateProduct = (): JSX.Element => {
  return (
    <div className="portlet-title">
      <div className="caption">Adicionar</div>

      <div className="tools">
        <div
          style={{
            cursor: 'pointer',
          }}
          key={Math.random()}
        >
          <i style={{ marginRight: '5px' }} className="fa fa-list" />
          Listar
        </div>
      </div>
    </div>
  );
};
