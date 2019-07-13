// @flow

import {
  type TClient,
  emptyClient,
} from '../../models/Clients';

import {
  type TResidence,
  type TResidences,
  emptyResidence,
} from '../../models/Residences';

// **************
//
// **************

type TClientResidenceReservateProps = {
  title: string,
  client: TClient,
  residence: TResidence,
}; 

export const clientResidenceReservateViewFile = 'home/residence/index';
export const clientResidenceReservateViewProps: TClientResidenceReservateProps = {
  title: 'Home Switch Home - Residencia',
  client: emptyClient,
  residence: emptyResidence,
};
