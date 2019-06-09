// @flow

import {
  type TClient,
  emptyClient,
} from '../../models/Clients';

type TRegisterProps = {
  title: string,
  errors?: Array<{
    location: string,
    msg: string,
    param: string,
  }>,
  data: TClient,
}; 

export const registerViewFile = 'clients/details/index';
export const registerViewProps: TRegisterProps = {
  title: 'Cliente - Registrarse',
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
