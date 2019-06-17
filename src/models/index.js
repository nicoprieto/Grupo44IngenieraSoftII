// @flow

import { Model } from 'objection';
import Knex from 'knex';

import helpers, { type THelpers } from '../models.helpers';

import Users from './Users';
import Residences from './Residences';
import ResidencesPhotos from './ResidencesPhotos';
import Reservations from './Reservations';
import Clients from './Clients';
import Weeks from './Weeks';

export type TModels = {
  Users: Model,
  Residences: Model,
  ResidencesPhotos: Model,
  Reservations: Model,
  Clients: Model,
  Weeks: Model,
};

export type TModelsWithHelpers = TModels & {
  knex: any,
  helpers: THelpers,
};

export default (databasePath: string): TModelsWithHelpers | null => {
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
    Users.helpers = helpers;
    Residences.helpers = helpers;
    ResidencesPhotos.helpers = helpers;
    Reservations.helpers = helpers;
    Clients.helpers = helpers;
    Weeks.helpers = helpers;

    return {
      Users,
      Residences,
      ResidencesPhotos,
      Reservations,
      Clients,
      Weeks,
      helpers,
      knex,
    };

  } catch(e) {
    console.error(e);
    return null;
  }
};
