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
  credit_card_brand: string,
  credit_card_number: string,
  credit_card_expiration: string,
  credit_card_owner: string,
  credit_card_security_code: string,
  creditPoints: number,
  type: 'premium' | 'normal',
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
  credit_card_brand: '',
  credit_card_number: '',
  credit_card_expiration: '',
  credit_card_owner: '',
  credit_card_security_code: '',
  creditPoints: 0,
  type: 'normal',
  isEnabled: false,
  created_at: '',
  updated_at: '',
  isRemoved: false,
};

export default class Clients extends objection.Model {

  helpers: THelpers;

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
      credit_card_brand,
      credit_card_number,
      credit_card_expiration,
      credit_card_owner,
      credit_card_security_code,
    } = body;
    const arr = /^(\d{4})\s?(\d{4})\s?(\d{4})\s?(\d{4})$/.exec(credit_card_number);
    const credit_card_number_beautified = arr !== null ?
      `${arr[0]} ${arr[1]} ${arr[2]} ${arr[3]}`
      :
      credit_card_number
    ;
    return {
      id: null,
      email,
      pass,
      name,
      surname,
      birth_date: Clients.helpers.localedateToDatetimeString(birth_date),
      document_number,
      phone,
      address,
      credit_card_brand,
      credit_card_number: credit_card_number_beautified,
      credit_card_expiration,
      credit_card_owner,
      credit_card_security_code,
      creditPoints: 2,
      type: 'premium',
      isEnabled: true,
      created_at: Clients.helpers.now(),
      updated_at: '',
      isRemoved: false,
    };
  }

  static formatClient(client: TClient): TClient {
    return {
      ...client,
      birth_date: Clients.helpers.datetimeToDatetimeString(client.birth_date),
      credit_card_number: `XXXX XXXX XXXX X${client.credit_card_number.substring(13, 16)}`,
      credit_card_security_code: 'XXX',
    };
  }

  static get tableName() {
    return 'clients';
  }

  $beforeInsert() {
    this.created_at = Clients.helpers.now();
  }

  $beforeUpdate() {
    this.updated_at = Clients.helpers.now();
  }

  static get relationMappings () {
    return {
      weeks: {
        relation: objection.Model.HasManyRelation,
        modelClass: __dirname + '/Weeks',
        join: {
          from: 'clients.id',
          to: 'weeks.clients_id'
        }
      },
    }
  }

};
