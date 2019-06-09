// @flow

import {
  type TClient,
  emptyClient,
} from '../../models/Clients';

type THomeProps = {
  title: string,
  data: {
    client: TClient, 
  },
}; 

export const homeViewFile = 'home/index';
export const homeViewProps: THomeProps = {
  title: 'Home Switch Home - Bienvenido',
  data: {
    client: emptyClient,
  }
};
