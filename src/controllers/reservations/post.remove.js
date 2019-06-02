// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Reservations }: TModels
) => {
  const id = req.params.id;
  const reservation = await Reservations.query().findById(id);
  if(reservation instanceof Reservations) {
    try {
      await Reservations.query().findById(id).patch({ isRemoved: true });
      res.redirect('/admin/reservations');
    } catch(e) {
      // fail database
      console.error(e);
      res.redirect('/admin/reservations');
    }
  } else {
    res.redirect('/admin/reservations');
  }
};
