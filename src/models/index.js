// @flow

import { Model } from 'objection';
import Knex from 'knex';

import helpers, { type THelpers } from '../models.helpers';

import users from './Users';
import residences from './Residences';
import reservations from './Reservations';
import clients from './Clients';
import weeks from './Weeks';

export type TModels = {
  Users: Model,
  Residences: Model,
  ResidencesPhotos: Model,
  Reservations: Model,
  Clients: Model,
  Weeks: Model,
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
    const Users = users(Model);
    const { Residences, ResidencesPhotos } = residences(Model, helpers);
    const Reservations = reservations(Model, helpers, { Residences });
    const Clients = clients(Model, helpers);
    const Weeks = weeks(Model, helpers, { Residences });

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
