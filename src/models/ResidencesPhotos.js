// @flow

import objection from 'objection';

import { type THelpers } from '../models.helpers';

export type TResidencePhoto = {
  id: number | null,
  residences_id: number,
  filename: string,
  created_at: string,
  updated_at: string,
  isRemoved: bool,
};

export type TResidencePhotos = Array<TResidencePhoto>;

export default class ResidencesPhotos extends objection.Model {

  helpers: THelpers;

  static getFromReqBody({ body }: any, residenceId: number): TResidencePhotos {
    return body.photos.map(({ filename }): TResidencePhoto => ({
      id: null,
      residences_id: residenceId,
      filename,
      created_at: ResidencesPhotos.helpers.now(),
      updated_at: '',
      isRemoved: false,
    }));
  }

  static get tableName() {
    return 'residences_photos';
  }

  static get relationMappings () {
    return {
      residence: {
        relation: objection.Model.BelongsToOneRelation,
        modelClass: __dirname + '/Residences',
        join: {
          from: 'residences_photos.residences_id',
          to: 'residences.id'
        }
      }
    }
  }

}
