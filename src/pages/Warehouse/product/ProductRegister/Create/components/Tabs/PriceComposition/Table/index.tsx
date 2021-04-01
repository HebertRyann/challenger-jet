import React from 'react';
import { TooltipComponent } from '../../../../../../../../../components/TooltipComponent';

export const Table = (): JSX.Element => (
  <>
    <div className="row">
      <div className="form-content col-md-3">
        <TooltipComponent
          label="Margem de lucro"
          message="Selecione o tipo do produto"
        />
        <input className="form-control" type="text" />
      </div>
      <div className="form-content col-md-3">
        <TooltipComponent
          label="IPI (%)"
          message="Selecione o tipo do produto"
        />
        <input className="form-control" type="text" />
      </div>
      <div className="form-content col-md-3">
        <TooltipComponent
          label="Custo fixo"
          message="Selecione o tipo do produto"
        />
        <input className="form-control" type="text" />
      </div>
      <div className="form-content col-md-3">
        <TooltipComponent
          label="DIF ICMS"
          message="Selecione o tipo do produto"
        />
        <input className="form-control" type="text" />
      </div>
    </div>
  </>
);
