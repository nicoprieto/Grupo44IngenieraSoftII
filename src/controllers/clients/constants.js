// @flow

import {
  type TClient,
  emptyClient,
} from '../../models/Clients';

type TDetailsProps = {
  title: string,
  errors?: Array<{
    location: string,
    msg: string,
    param: string,
  }>,
  data: TClient,
  message?: string,
}; 

export const registerViewFile = 'clients/details/index';
export const registerViewProps: TDetailsProps = {
  title: 'Cliente - Registrarse',
  data: emptyClient,
};

export const updateViewFile = 'clients/details/index';
export const updateViewProps: TDetailsProps = {
  title: 'Cliente - Perfil',
  data: emptyClient,
};

// *********************
//
// *********************

type TLoginProps = {
  title: string,
  errors?: Array<{
    location: string,
    msg: string,
    param: string,
  }>,
  data: {
    email: string,
    pass: string,
  },
}; 

export const loginViewFile = 'clients/login/index';
export const loginViewProps: TLoginProps = {
  title: 'Area cliente - Iniciar sesion',
  data: {
    email: '',
    pass: '',
  },
};

// *********************
//
// *********************
