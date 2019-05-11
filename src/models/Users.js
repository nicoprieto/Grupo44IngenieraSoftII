// @flow

import objection from 'objection';

export default (Model: objection.Model) => {

  return class Users extends Model {

    static get tableName() {
      return 'users';
    }

  };

};
