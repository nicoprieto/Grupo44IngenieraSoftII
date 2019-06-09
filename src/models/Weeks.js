// @flow

import objection from 'objection';

import { type THelpers } from '../models.helpers';

import {
  type TResidence,
} from './Residences';

export type TWeek = {
  id: number | null,
  residences_id: number,
  clients_id: number | null,
  purchase_method: 'premium' | 'bidding' | 'hotsale' | null,
  number: string,
  year: string,
  // not stored in table, derived from number and year
  weekString?: string,
  isEnabled: bool,
  created_at: string,
  updated_at: string,
  isRemoved: bool,
  // derived from relation, not stored as field
  residence?: TResidence,
};

export type TWeeks = Array<TWeek>;

export const emptyWeek: TWeek = {
  id: null,
  residences_id: 0,
  clients_id: null,
  purchase_method: null,
  number: '',
  year: '',
  weekString: undefined,
  isEnabled: true,
  created_at: '',
  updated_at: '',
  isRemoved: false,
};

export default (
  Model: objection.Model,
  helpers: THelpers,
  modelClasses: { Residences: objection.Model }
) => {

  return class Weeks extends Model {

    static getFromReqBody({ body }: any): TWeeks {
      const {
        residences_id, // is an array
        number,
        year,
        isEnabled,
      } = body;
      if(!Array.isArray(residences_id)) {
        return [];
      }
      return residences_id.map((residenceId): TWeek => ({
        id: null,
        residences_id: residenceId,
        clients_id: null,
        purchase_method: null,
        number,
        year,
        // when creating isEnbled is undefined, set to true by default
        isEnabled: typeof isEnabled === 'undefined' ? true : isEnabled === 'on',
        created_at: helpers.now(),
        updated_at: '',
        isRemoved: false,
      }));
    }

    static getCurrentWeek(): TWeek {
      const d = helpers.moment().add(1, 'year').startOf('week');
      const week = d.format('w');
      const year = d.format('YYYY');
      const format = 'DD/MM/YYYY';
      return {
        id: null,
        residences_id: 0,
        clients_id: null,
        purchase_method: null,
        number: week,
        year,
        weekString: `Semana empezando ${d.format(format)} hasta ${d.add('1', 'week').format(format)}`,
        isEnabled: true,
        created_at: helpers.now(),
        updated_at: '',
        isRemoved: false,
      };
    }

    static get tableName() {
      return 'weeks';
    }

    static get relationMappings () {
      return {
        residence: {
          relation: Model.BelongsToOneRelation,
          modelClass: modelClasses.Residences,
          join: {
            from: 'weeks.residences_id',
            to: 'residences.id'
          }
        }
      }
    }

  };

};
