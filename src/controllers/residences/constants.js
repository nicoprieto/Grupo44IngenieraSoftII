// @flow

import { type TResidences } from '../../models/Residences';

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
  data: {
    title: string,  
  },
}; 

export const residenceCreateViewFile = 'admin/residences/details';
export const residenceCreateViewProps: TCreateViewProps = {
  title: 'Residencia - Crear',
  data: {
    title: 'Test title',
    description: 'Test description',
    address_street: 'Test street',
    address_number: 'Test number',
    address_postal_code: 'Test postal code',
    address_city: 'Test city',
    address_state: 'Text state',
    address_nation: 'Argentina',
    address_apartament: '',
    address_flat: '',
    isEnabled: true,
  },
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
  data: {
    title: string,  
  },
}; 

export const residenceUpdateViewFile = 'admin/residences/details';
export const residenceUpdateViewProps: TCreateViewProps = {
  title: 'Residencia - Editar',
  data: {
    title: 'Test title',
    description: 'Test description',
    address_street: 'Test street',
    address_number: 'Test number',
    address_postal_code: 'Test postal code',
    address_city: 'Test city',
    address_state: 'Text state',
    address_nation: 'Argentina',
    address_apartament: '',
    address_flat: '',
    isEnabled: true,
  },
};