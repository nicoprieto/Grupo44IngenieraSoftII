// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  reservationRemoveViewFile,
  reservationRemoveViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Reservations }: TModels
) => {
  const id = req.params.id;
  const reservation = await Reservations.query().findById(id);
  if(reservation instanceof Reservations) {
    res.render(
      reservationRemoveViewFile,
      {
        ...reservationRemoveViewProps,
        data: { ...reservation },
      }
    );
  } else {
    res.redirect('/admin/reservations');
  } 
};
