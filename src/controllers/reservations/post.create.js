// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import { type TReservations } from '../../models/Reservations';

import {
  reservationCreateViewFile,
  reservationCreateViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Reservations, Residences }: TModels
) => {
  const residences = await Residences.query().select('id', 'title');
  const errors = helpers.validator.validationResult(req);
  if(errors.isEmpty()) {
    try {
      // create reservation
      const residenceData = Reservations.getFromReqBody(req);
      const residence = await Reservations.query().insert(residenceData);
      // redirect to reservations after creation
      res.redirect('/admin/reservations');
    // database error
    } catch(e) {
      console.error(e);
      res.render(
        reservationCreateViewFile,
        {
          ...reservationCreateViewProps,
          errors: [
            {
              "location": "body",
              "msg": "Fallo la creacion de la reserva, intente de vuelta",
              "param": ""
            }
          ],
          data: {
            id: null,
            ...req.body,
          },
          residences,
        }
      );
    }
  // post data submitted is invalid
  } else {
    res.render(
      reservationCreateViewFile,
      {
        ...reservationCreateViewProps,
        errors: errors.array(),
        data: {
          id: null,
          ...req.body,
        },
        residences,
      }
    );
  }
};
