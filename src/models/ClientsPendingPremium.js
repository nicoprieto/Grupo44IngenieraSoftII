// @flow

import objection from 'objection';

import { type THelpers } from '../models.helpers';

export type TClientsPendingPremium = {
  id: number | null,
  clients_id: number,
  description: string,
  type: 'upgrade' | 'downgrade',
  created_at: string,
  updated_at: string,
  isRemoved: bool,
};

export default class ClientsPendingPremium extends objection.Model {

  helpers: THelpers;

  static getFromReqBody(
    { body }: any,
    clients_id: number,
    type: $PropertyType<TClientsPendingPremium, 'type'>
  ): TClientsPendingPremium {
    const {
      description,
    } = body;
    return {
      id: null,
      clients_id,
      description,
      type,
      created_at: ClientsPendingPremium.helpers.now(),
      updated_at: '',
      isRemoved: false,
    };
  }

  static get tableName() {
    return 'clients_pending_premium';
  }

  static get relationMappings () {
    return {
      client: {
        relation: objection.Model.HasOneRelation,
        modelClass: __dirname + '/Clients',
        join: {
          from: 'clients_pending_premium.clients_id',
          to: 'clients.id',
        }
      },
    }
  }

};
