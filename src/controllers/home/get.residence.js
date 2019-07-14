// $flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModelsWithHelpers } from '../../models';

import {
  emptyClient,
} from '../../models/Clients';

import {
  residenceViewFile,
  residenceViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  {
    Clients,
    Weeks,
    Residences,
    helpers: {
      getWeeksRangeFromStartAndEndLocaledateStrings,
      getYearsRangeFromStartAndEndLocaledateStrings,
    },
  }: TModelsWithHelpers
) => {
  let { client } = res.locals;
  const id = req.params['0'];
  const didWeekHasBeenReservated = typeof req.query.reservated !== 'undefined';
  const errorMessage = typeof req.query.error === 'string' ? req.query.error : '';
  const start_date = req.query.start_date || '';
  const end_date = req.query.end_date || '';
  try {
    const residence = await Residences
      .query()
      .findById(id)
      .eager('[photos, weeks]')
      .modifyEager('weeks', (builder) => {
        if(start_date === '' && end_date === '') {
          return builder.where('clients_id', null);
        } else {
          const weeksRange = getWeeksRangeFromStartAndEndLocaledateStrings(start_date, end_date);
          const yearsRange = getYearsRangeFromStartAndEndLocaledateStrings(start_date, end_date);
          return builder
            .where('clients_id', null)
            .whereIn('number', weeksRange)
            .whereIn('year', yearsRange)
          ;
        }
      })
      .where({
        'residences.isRemoved': false,
      })
    ;
    if(residence instanceof Residences) {
      res.render(
        residenceViewFile,
        { 
          ...residenceViewProps,
          residence: {
            ...residence,
          },
          client,
          didWeekHasBeenReservated,
          errorMessage,
        }
      );
    // id is removed or missing
    } else {
      res.status(helpers.HttpStatusCodes.BAD_REQUEST).send();
    }
    // database error
  } catch(e) {
    console.error('fail get.residence', e);
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
