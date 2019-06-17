// $flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  changePassViewFile,
  changePassViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Clients }: TModels
) => {
  const { client } = res.locals;
  res.render(
    changePassViewFile,
    {
      ...changePassViewProps,
      data: Clients.formatClient(client),
    },
  );
};
