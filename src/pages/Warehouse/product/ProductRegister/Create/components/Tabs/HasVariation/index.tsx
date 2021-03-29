import React from 'react';
export const labelHasVariation = 'Variação';
export const nameHasVariation = '@@tabs-has-variation';

export const HasVariation = (): JSX.Element => {
  return (
    <div>
      <h1>{labelHasVariation}</h1>
      <h3>{nameHasVariation}</h3>
    </div>
  );
};
