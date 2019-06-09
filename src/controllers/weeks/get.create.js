// $flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  createViewFile,
  createViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Weeks, Residences }: TModels
) => {
  res.render(
    createViewFile,
    {
      ...createViewProps,
      data: Weeks.getCurrentWeek(),
      residences: await Residences
        .query()
        .select('id', 'title')
    }
  );
};
