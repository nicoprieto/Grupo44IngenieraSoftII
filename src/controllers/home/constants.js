// @flow

import {
  type TClient,
  emptyClient,
} from '../../models/Clients';

import {
  type TResidences,
} from '../../models/Residences';

type THomeProps = {
  title: string,
  client: TClient,
  residences: TResidences,
}; 

export const homeViewFile = 'home/index';
export const homeViewProps: THomeProps = {
  title: 'Home Switch Home - Bienvenido',
  client: emptyClient,
  residences: [],
};
