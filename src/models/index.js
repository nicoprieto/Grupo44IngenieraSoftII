// @flow

import { Model } from 'objection';
import Knex from 'knex';

import helpers, { type THelpers } from '../models.helpers';

import Users from './Users';
import Residences from './Residences';

export type TModels = {
  // TODO: set typing
  Users: any,
  Residences: any,
  ResidencesPhotos: any,
  knex: any,
  helpers: THelpers,
};

export default (databasePath: string): TModels | null => {
  try {
    // Initialize knex.
    const knex = Knex({
      client: 'sqlite3',
      useNullAsDefault: false,
      connection: {
        filename: databasePath,
      },
      debug: true,
    });

    // Give the knex instance to objection.
    Model.knex(knex);

    // initialize models and return them
    return {
      Users: Users(Model),
      // will split in Residences and ResidencesPhotos
      ...Residences(Model),
      helpers,
      knex,
    };

  } catch(e) {
    console.error(e);
    return null;
  }
};
