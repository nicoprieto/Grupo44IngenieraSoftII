// @flow

import objection from 'objection';

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
  price: number,
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
  Model: objection.Model
) => {

  class ResidencesPhotos extends Model {

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
