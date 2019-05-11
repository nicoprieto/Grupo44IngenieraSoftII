// $flow

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
  { Users }: TModels
) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};
