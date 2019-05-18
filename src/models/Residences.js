// @flow

import objection from 'objection';

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
