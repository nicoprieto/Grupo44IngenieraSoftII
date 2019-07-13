// @flow

// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import { type TWeeks } from '../../models/Weeks';

import {
  createViewFile,
  createViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Weeks }: TModels
) => {
  try {
    await Weeks.query().delete();
    res.redirect('/admin/weeks');
  // database error
  } catch(e) {
    console.error('fail get.delete.all', e);
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
