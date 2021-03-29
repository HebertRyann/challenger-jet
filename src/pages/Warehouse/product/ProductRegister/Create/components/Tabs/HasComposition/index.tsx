import React from 'react';
export const labelHasComposition = 'Composição';
export const nameHasComposition = '@@tabs-has-composition';

export const HasComposition = (): JSX.Element => {
  return (
    <div>
      <h1>{labelHasComposition}</h1>
      <h3>{nameHasComposition}</h3>
    </div>
  );
};
