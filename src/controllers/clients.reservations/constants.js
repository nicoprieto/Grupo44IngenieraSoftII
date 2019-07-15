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

type TListViewProps = {
  title: string,
  client: TClient,
  residence: TResidence,
}; 

export const listViewFile = 'clients/reservations/list';
export const listViewProps: TListViewProps = {
  title: 'Mis Reservas',
  client: emptyClient,
  residence: emptyResidence,
};
