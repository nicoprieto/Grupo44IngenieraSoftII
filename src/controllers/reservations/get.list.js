// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  listViewFile,
  listViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Reservations, Residences }: TModels
) => {
  try {
    res.render(
      listViewFile,
      {
        ...listViewProps,
        data: await Reservations
          .query()
          .joinEager('residence')
          .modifyEager('residence', (builder) => 
            builder.select('residences.id', 'title')
          )
          //.select('reservations.*', 'residence.id', 'residence.title')
          .where('reservations.isRemoved', false)
          .orderBy('reservations.id', 'DESC'),
      }
    );
  } catch(e) {
    console.error('fail Reservation.get.list', e);
    res.render(listViewFile, listViewProps);
  }
};
