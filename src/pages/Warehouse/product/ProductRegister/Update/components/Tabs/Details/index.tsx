import React from 'react';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import { Container, TextArea } from './style';
import { NewInput } from '../../../../../../../../components/NewInput';
import {
  genericMaskWithTwoZero,
  numericMask,
  weightMask,
} from '../../../../../../../../utlis/mask';
import { useTabCreate } from '../../../providers/tabsProvider';

export const Details = (): JSX.Element => {
  const { details } = useTabCreate();

  return (
    <>
      <div className="row"></div>
    </>
  );
};

export const labelDetails = 'Detalhes';
export const nameDetails = '@@tabs-details';
