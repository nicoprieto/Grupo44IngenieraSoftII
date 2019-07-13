// @flow

import {
  emptyWeek,
  type TWeek,
  type TWeeks,
} from '../../models/Weeks';

type TListViewProps = {
  title: string,
  data: TWeeks,
  isDebugMode: bool,
}; 

export const listViewFile = 'admin/weeks/list';
export const listViewProps: TListViewProps = {
  title: 'Semanas - Listado',
  data: [],
  isDebugMode: false,
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
  isDebugMode: bool,
  data: TWeek,
  residences: TResidences,
}; 

export const createViewFile = 'admin/weeks/details';
export const createViewProps: TCreateViewProps = {
  title: 'Semanas - Crear',
  data: { ...emptyWeek },
  // allows creation week/year by user
  isDebugMode: false,
  residences: [],
};
