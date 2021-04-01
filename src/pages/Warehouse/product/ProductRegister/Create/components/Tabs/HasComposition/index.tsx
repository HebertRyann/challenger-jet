import React, { useState } from 'react';
import { ResponseEntiryWithIdNameWithChildren } from '../../../services/api';
import { Table } from './Table';
import { Footer } from '../../footer';

export const HasComposition = (): JSX.Element => (
  <div className="row">
    <Table />
    <Footer />
  </div>
);

export const labelHasComposition = 'Composição';
export const nameHasComposition = '@@tabs-has-composition';
