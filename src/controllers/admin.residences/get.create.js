// $flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  residenceCreateViewFile,
  residenceCreateViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Users }: TModels
) => {
  res.render(residenceCreateViewFile, residenceCreateViewProps);
};
