// @flow

import {
  emptyResidence,
  type TResidence,
  type TResidences,
} from '../../models/Residences';

type TListViewProps = {
  title: string,
  data: TResidences
}; 

export const listViewFile = 'admin/residences/list';
export const listViewProps: TListViewProps = {
  title: 'Residencia - Listado',
  data: [],
};

// *********************
//
// *********************

type TCreateViewProps = {
  title: string,
  errors?: Array<{
    location: string,
    msg: string,
    param: string,
  }>,
  data: TResidence,
}; 

export const residenceCreateViewFile = 'admin/residences/details';
export const residenceCreateViewProps: TCreateViewProps = {
  title: 'Residencia - Crear',
  data: { ...emptyResidence },
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
  data: TResidence,
}; 

export const residenceUpdateViewFile = 'admin/residences/details';
export const residenceUpdateViewProps: TCreateViewProps = {
  title: 'Residencia - Detalle',
  data: { ...emptyResidence },
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
  data: TResidence,
}; 

export const residenceRemoveViewFile = 'admin/residences/remove';
export const residenceRemoveViewProps: TRemoveViewProps = {
  title: 'Residencia - Eliminar',
  data: { ...emptyResidence },
};
