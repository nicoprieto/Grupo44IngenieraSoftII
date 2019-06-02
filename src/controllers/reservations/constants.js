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

type TUpdateViewProps = {
  title: string,
  errors?: Array<{
    location: string,
    msg: string,
    param: string,
  }>,
  data: TReservation,
  residences: TResidences,
};

export const reservationUpdateViewFile = 'admin/reservations/details';
export const reservationUpdateViewProps: TCreateViewProps = {
  title: 'Reservas - Detalle',
  data: { ...emptyReservation },
  residences: [],
};

// *********************
//
// *********************

type TRemoveViewProps = {
  title: string,
  errors?: Array<{
    location: string,
    msg: string,
    param: string,
  }>,
  data: TReservation,
}; 

export const reservationRemoveViewFile = 'admin/reservations/remove';
export const reservationRemoveViewProps: TRemoveViewProps = {
  title: 'Reservas - Eliminar',
  data: { ...emptyReservation },
};
