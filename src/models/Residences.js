// @flow

import objection from 'objection';

import { type THelpers } from '../models.helpers';

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
};

export type TResidences = Array<TResidence>;

export type TResidencePhoto = {
  id: number | null,
  residences_id: number,
  filename: string,
  created_at: string,
  updated_at: string,
  isRemoved: bool,
};

export type TResidencePhotos = Array<TResidencePhoto>;

export default (
  Model: objection.Model,
  helpers: THelpers
) => {

  class ResidencesPhotos extends Model {

    static getFromReqBody({ body }: any, residenceId: number): TResidencePhotos {
      return body.photos.map(({ filename }): TResidencePhoto => ({
        id: null,
        residences_id: residenceId,
        filename,
        created_at: helpers.now(),
        updated_at: '',
        isRemoved: false,
      }));
    }

    static get tableName() {
      return 'residences_photos';
    }

    static get relationMappings () {
      return {
        idea: {
          relation: Model.BelongsToOneRelation,
          modelClass: Residences,
          join: {
            from: 'residences_photos.residences_id',
            to: 'residences.id'
          }
        }
      }
    }

  }

  class Residences extends Model {

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
        price,
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
        created_at: helpers.now(),
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
          relation: Model.HasManyRelation,
          modelClass: ResidencesPhotos,
          join: {
            from: 'residences.id',
            to: 'residences_photos.residences_id'
          }
        }
      }
    }

  };

  return {
    ResidencesPhotos,
    Residences,
  };
};
