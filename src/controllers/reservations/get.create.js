// $flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

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
  res.render(
    reservationCreateViewFile,
    {
      ...reservationCreateViewProps,
      data: Reservations.generateEmptyReservation(),
      residences: await Residences
        .query()
        .select('id', 'title')
    }
  );
};
