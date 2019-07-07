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
  residencesViewFile,
  residencesViewProps,
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
      getWeekAndYearFromLocaledateString,
    },
  }: TModelsWithHelpers
) => {
  let errors = undefined;
  const {
    city,
    start_date,
    end_date,
  } = req.query;
  let { client } = res.locals;
  // if there a client available show the residences // availables for reservations
  let residences = [];
  let cities = [];
  try {
    // user is logged
    if(client.id !== null) {
      // user logged can search, so fill up cities array
      cities = await Residences
        .query()
        .select('address_city')
        .where({
          isRemoved: false,
        })
        .map(({ address_city }) => address_city)
      ;

      // but it has bad search input params
      const validationResult = helpers.validator.validationResult(req);
      // user is searching and not errors in query?
      if(
        validationResult.isEmpty() &&
        typeof city !== 'undefined' &&
        typeof start_date !== 'undefined' &&
        typeof end_date !== 'undefined'
      ) {
        const start = getWeekAndYearFromLocaledateString(start_date);
        const end = getWeekAndYearFromLocaledateString(end_date);
        const weeksRange = start.week <= end.week ?
          Array(52)
          .fill('?')
          .map((_, i) => i)
          .filter((_, i) => i >= start.week && i <= end.week)
          :
        // esta buscando finales de este anio y comienzo del anio siguiente
          Array(52)
          .fill('?')
          .map((_, i) => i)
          .filter((_, i) => i >= start.week)
          .concat(
            Array(52)
            .map((_, i) => i)
            .fill('?')
            .filter((_, i) => i <= end.week)
          )
        ;
        const yearsRange = [ start.year, end.year ];
        if(city !== 'Todas') {
          residences = await Residences
            .query()
            .eager('photos')
            .joinRelation('weeks')
            .where({
              address_city: city,
            })
            .whereIn('number', weeksRange)
            .whereIn('year', yearsRange)
          ;
        } else {
          residences = await Residences
            .query()
            .eager('photos')
            .joinRelation('weeks')
            .whereIn('number', weeksRange)
            .whereIn('year', yearsRange)
          ;
        }

      // user is searching but the input bad params
      } else if(
        !validationResult.isEmpty()
      ) {
        residences = await Residences
          .query()
          .eager('photos')
          .joinRelation('weeks')
        ;
        errors = validationResult.array();

      // user is logged and is not searching
      } else {
        residences = await Residences
          .query()
          .eager('photos')
          .joinRelation('weeks')
        ;
      }
    // show five residences
    } else {
      residences = await Residences
        .query()
        .eager('photos')
        .limit(5)
        // dont care if they are enabled or removed
    }
    res.render(
      residencesViewFile,
      {
        ...residencesViewProps,
        client,
        residences,
        cities,
        errors,
        searchParams: {
          city: city || '',
          start_date: start_date || '',
          end_date: end_date || '',
        },
      }
    );
  // database error
  } catch(e) {
    console.error('fail get.residences', e);
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
