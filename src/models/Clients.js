// @flow

import objection from 'objection';

import { type THelpers } from '../models.helpers';

export type TClient = {|
  id: number | null,
  email: string,
  // sometimes pass is not retrieved
  pass?: string,
  name: string,
  surname: string,
  birth_date: string,
  document_number: string,
  phone: string,
  address: string,
  credit_card_number: string,
  credit_card_expiration: string,
  credit_card_owner: string,
  credit_card_security_code: string,
  isEnabled: bool,
  created_at: string,
  updated_at: string,
  isRemoved: bool,
|};

export type TClients = Array<TClient>;

export const emptyClient: TClient = {
  id: null,
  email: '',
  pass: '',
  name: '',
  surname: '',
  birth_date: '',
  document_number: '',
  phone: '',
  address: '',
  credit_card_number: '',
  credit_card_expiration: '',
  credit_card_owner: '',
  credit_card_security_code: '',
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
        birth_date,
        document_number,
        phone,
        address,
        credit_card_number,
        credit_card_expiration,
        credit_card_owner,
        credit_card_security_code,
      } = body;
      return {
        id: null,
        email,
        pass,
        name,
        surname,
        birth_date: helpers.localedateToDatetimeString(birth_date),
        document_number,
        phone,
        address,
        credit_card_number,
        credit_card_expiration,
        credit_card_owner,
        credit_card_security_code,
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
