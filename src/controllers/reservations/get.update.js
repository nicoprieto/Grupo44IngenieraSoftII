// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModelsWithHelpers } from '../../models';

import {
  reservationUpdateViewFile,
  reservationUpdateViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Reservations, Residences, helpers: { datetimeToDatetimeString } }: TModelsWithHelpers
) => {
  const id = req.params.id;
  const reservation = await Reservations.query().findById(id);
  if(reservation instanceof Reservations) {
    const {
      premium_date_start,
      premium_date_end,
      bidding_date_start,
      bidding_date_end,
      hotsale_date_start,
      hotsale_date_end
    } = reservation;
    res.render(
      reservationUpdateViewFile,
      {
        ...reservationUpdateViewProps,
        data: {
          ...reservation,
          premium_date_start: datetimeToDatetimeString(premium_date_start),
          premium_date_end: datetimeToDatetimeString(premium_date_end),
          bidding_date_start: datetimeToDatetimeString(bidding_date_start),
          bidding_date_end: datetimeToDatetimeString(bidding_date_end),
          hotsale_date_start: datetimeToDatetimeString(hotsale_date_start),
          hotsale_date_end: datetimeToDatetimeString(hotsale_date_end),
        },
        residences: await Residences
          .query()
          .select('id', 'title')
      }
    );
  } else {
    res.redirect('/admin/reservations');
  } 
};
