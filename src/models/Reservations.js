// @flow

import objection from 'objection';

import { type THelpers } from '../models.helpers';

import {
  type TResidence,
} from './Residences';

export type TReservation = {
  id: number | null,
  residences_id: number,
  title: string,
  description: string,
  premium_date_start: string,
  premium_date_end: string,
  bidding_date_start: string,
  bidding_date_end: string,
  hotsale_date_start: string,
  hotsale_date_end: string,
  purchase_method: 'premium' | 'bidding' | 'hotsale' | null,
  isEnabled: bool,
  created_at: string,
  updated_at: string,
  isRemoved: bool,
  // derived from relation, not stored as field
  residence?: TResidence,
};

export type TReservations = Array<TReservation>;

export const emptyReservation: TReservation = {
  id: null,
  residences_id: 0,
  title: '',
  description: '',
  premium_date_start: '',
  premium_date_end: '',
  bidding_date_start: '',
  bidding_date_end: '',
  hotsale_date_start: '',
  hotsale_date_end: '',
  purchase_method: null,
  isEnabled: true,
  created_at: '',
  updated_at: '',
  isRemoved: false,
};

export default (
  Model: objection.Model,
  helpers: THelpers,
  modelClasses: { Residences: any }
) => {

  return class Reservations extends Model {

    static getFromReqBody({ body }: any): TReservation {
      const {
        residences_id,
        title,
        description,
        premium_date_start,
        premium_date_end,
        bidding_date_start,
        bidding_date_end,
        hotsale_date_start,
        hotsale_date_end,
        purchase_method,
        isEnabled,
      } = body;
      return {
        id: null,
        residences_id,
        // these fields are optional
        title: title || '',
        description: description || '',
        premium_date_start: helpers.localedateToDatetimeString(premium_date_start),
        premium_date_end: helpers.localedateToDatetimeString(premium_date_end),
        bidding_date_start: helpers.localedateToDatetimeString(bidding_date_start),
        bidding_date_end: helpers.localedateToDatetimeString(bidding_date_end),
        // these fields are optional
        hotsale_date_start: helpers.localedateToDatetimeString(hotsale_date_start) || '',
        hotsale_date_end: helpers.localedateToDatetimeString(hotsale_date_end) || '',
        purchase_method: null,
        isEnabled: isEnabled === 'on',
        created_at: helpers.now(),
        updated_at: '',
        isRemoved: false,
      };
    }

    static generateEmptyReservation(): TReservation {
      const format = 'DD/MM/YYYY';
      const premium_date_start = helpers.moment();
      const premium_date_end = helpers.moment(premium_date_start).add('6', 'months');
      const bidding_date_start = helpers.moment(premium_date_end).add('1', 'day');
      const bidding_date_end = helpers.moment(bidding_date_start).add('2', 'days');
      return {
        id: null,
        residences_id: 0,
        title: '',
        description: '',
        premium_date_start: premium_date_start.format(format),
        premium_date_end: premium_date_end.format(format),
        bidding_date_start: bidding_date_start.format(format),
        bidding_date_end: bidding_date_end.format(format),
        hotsale_date_start: '',
        hotsale_date_end: '',
        purchase_method: null,
        isEnabled: true,
        created_at: helpers.now(),
        updated_at: '',
        isRemoved: false,
      };
    }

    static get tableName() {
      return 'reservations';
    }

    static get relationMappings () {
      return {
        residence: {
          relation: Model.BelongsToOneRelation,
          modelClass: modelClasses.Residences,
          join: {
            from: 'reservations.residences_id',
            to: 'residences.id'
          }
        }
      }
    }

  };

};
