// @flow

import objection from 'objection';

import { type THelpers } from '../models.helpers';

import { type TResidencePhotos } from './ResidencesPhotos';

import { type TWeeks } from './Weeks';

export type TResidence = {
  id: number | null,
  title: string,
  description: string,
  address_street: string,
  address_number: string,
  address_postal_code: string,
  address_city: string,
  address_state: string,
  address_nation: string,
  address_apartament: string,
  address_flat: string,
  isEnabled: bool,
  created_at: string,
  updated_at: string,
  isRemoved: bool,
  // derived from relation, not stored as field
  photos?: TResidencePhotos,
  weeks?: TWeeks,
};

export type TResidences = Array<TResidence>;

export const emptyResidence: TResidence = {
  id: null,
  title: '',
  description: '',
  address_street: '',
  address_number: '',
  address_postal_code: '',
  address_city: '',
  address_state: '',
  address_nation: '',
  address_apartament: '',
  address_flat: '',
  isEnabled: true,
  created_at: '',
  updated_at: '',
  isRemoved: false,
};

/*
export const emptyResidence: TResidence = {
  id: null,
  title: 'title',
  description: 'description',
  address_street: 'address_street',
  address_number: 'address_number',
  address_postal_code: 'address_postal_code',
  address_city: 'address_city',
  address_state: 'address_state',
  address_nation: 'address_nation',
  address_apartament: 'address_apartament',
  address_flat: 'address_flat',
  isEnabled: true,
  created_at: '',
  updated_at: '',
  isRemoved: false,
};
*/

export default class Residences extends objection.Model {

  helpers: THelpers;

  static getFromReqBody({ body }: any): TResidence {
    const {
      title,
      description,
      address_street,
      address_number,
      address_postal_code,
      address_city,
      address_state,
      address_nation,
      address_apartament,
      address_flat,
      isEnabled,
      starting_bid_price,
    } = body;
    return {
      id: null,
      title,
      description,
      address_street,
      address_number,
      address_postal_code,
      address_city,
      address_state,
      address_nation,
      address_apartament,
      address_flat,
      isEnabled: isEnabled === 'on',
      starting_bid_price,
      created_at: Residences.helpers.now(),
      updated_at: '',
      isRemoved: false,
    };
  }

  static get tableName() {
    return 'residences';
  }

  static get relationMappings () {
    return {
      photos: {
        relation: objection.Model.HasManyRelation,
        modelClass: __dirname + '/ResidencesPhotos',
        join: {
          from: 'residences.id',
          to: 'residences_photos.residences_id'
        }
      },
      weeks: {
        relation: objection.Model.HasManyRelation,
        modelClass: __dirname + '/Weeks',
        join: {
          from: 'residences.id',
          to: 'weeks.residences_id'
        }
      },
    }
  }

};
