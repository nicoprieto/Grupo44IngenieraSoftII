// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  residenceUpdateViewFile,
  residenceUpdateViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Users }: TModels
) => {
  res.render(residenceUpdateViewFile, residenceUpdateViewProps);
};
