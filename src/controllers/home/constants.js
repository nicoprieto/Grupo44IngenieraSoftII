// @flow

import {
  type TClient,
  emptyClient,
} from '../../models/Clients';

import {
  type TWeeks,
} from '../../models/Weeks';

type THomeProps = {
  title: string,
  client: TClient,
  weeks: TWeeks
}; 

export const homeViewFile = 'home/index';
export const homeViewProps: THomeProps = {
  title: 'Home Switch Home - Bienvenido',
  client: emptyClient,
  weeks: [],
};
