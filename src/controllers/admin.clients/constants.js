// @flow

import {
  emptyClient,
  type TClient,
  type TClients,
} from '../../models/Clients';

type TListViewProps = {
  title: string,
  data: TClients,
  error: string,
  message: string,
  searchParams: {
    name: string,
    type: 'Todos' | 'premium' | 'normal' | '',
    created_at: string,
  },
  types: Array<string>,
  didSearch: bool,
};

export const listViewFile = 'admin/clients/list';
export const listViewProps: TListViewProps = {
  title: 'Listado de clientes',
  data: [],
  error: '',
  message: '',
  searchParams: {
    name: '',
    type: '',
    created_at: '',
  },
  types: [ 'premium', 'normal' ],
  didSearch: false,
};

// ********************
//
// ********************

type TListPendingPremiumViewProps = {
  title: string,
  data: TClients,
  error: string,
  message: string,
};

// WARNING a pug cannot contains dots in the filename? why?
export const listPendingPremiumViewFile = 'admin/clients/list.pending.premium.pug';
export const listPendingPremiumViewProps: TListPendingPremiumViewProps = {
  title: 'Listado de solicitudes alta/baja premium',
  data: [],
  error: '',
  message: '',
};
