// @flow

import objection from 'objection';

import { type THelpers } from '../models.helpers';

export default class Users extends objection.Model {

  helpers: THelpers;

  static get tableName() {
    return 'users';
  }

};
