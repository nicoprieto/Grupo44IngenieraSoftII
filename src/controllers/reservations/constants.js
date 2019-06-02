// @flow

import {
  emptyReservation,
  type TReservation,
  type TReservations,
} from '../../models/Reservations';

type TListViewProps = {
  title: string,
  data: TReservations,
}; 

export const listViewFile = 'admin/reservations/list';
export const listViewProps: TListViewProps = {
  title: 'Reservas - Listado',
  data: [],
};

// *********************
//
// *********************

import {
  type TResidences,
} from '../../models/Residences';

type TCreateViewProps = {
  title: string,
  errors?: Array<{
    location: string,
    msg: string,
    param: string,
  }>,
  data: TReservation,
  residences: TResidences,
}; 

export const reservationCreateViewFile = 'admin/reservations/details';
export const reservationCreateViewProps: TCreateViewProps = {
  title: 'Reservas - Crear',
  data: { ...emptyReservation },
  residences: [],
};

// *********************
//
// *********************