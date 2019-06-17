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

export const registerViewFile = 'clients/register/index';
export const registerViewProps: TDetailsProps = {
  title: 'Cliente - Registrarse',
  data: emptyClient,
};

export const profileViewFile = 'clients/profile/index';
export const profileViewProps: TDetailsProps = {
  title: 'Cliente - Perfil',
  data: emptyClient,
};

export const updateViewFile = 'clients/update/index';
export const updateViewProps: TDetailsProps = {
  title: 'Cliente - Editar Perfil',
  data: emptyClient,
};

export const changePassViewFile = 'clients/change.pass/index';
export const changePassViewProps: TDetailsProps = {
  title: 'Cliente - Cambiar contraseña',
  data: emptyClient,
};

export const changeCreditCardViewFile = 'clients/change.credit.card/index';
export const changeCreditCardViewProps: TDetailsProps = {
  title: 'Cliente - Editar tarjeta de credito',
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
