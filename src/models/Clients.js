// @flow

import objection from 'objection';

import { type THelpers } from '../models.helpers';

export type TClient = {
  id: number | null,
  email: string,
  name: string,
  surname: string,
  document_number: string,
  phone: string,
  address: string,
  isEnabled: bool,
  created_at: string,
  updated_at: string,
  isRemoved: bool,
};

export type TClients = Array<TClient>;

export const emptyClient: TClient = {
  id: null,
  email: '',
  pass: '',
  name: '',
  surname: '',
  document_number: '',
  phone: '',
  address: '',
  isEnabled: false,
  created_at: '',
  updated_at: '',
  isRemoved: false,
};

export default (
  Model: objection.Model,
  helpers: THelpers
) => {

  class Clients extends Model {

    static getFromReqBody({ body }: any): TClient {
      const {
        id,
        email,
        pass,
        name,
        surname,
        document_number,
        phone,
        address,
      } = body;
      return {
        id: null,
        email,
        pass,
        name,
        surname,
        document_number,
        phone,
        address,
        isEnabled: true,
        created_at: helpers.now(),
        updated_at: '',
        isRemoved: false,
      };
    }

    static get tableName() {
      return 'clients';
    }

  };

  return Clients;
};
