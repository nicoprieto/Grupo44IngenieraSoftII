// $flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  changeCreditCardViewFile,
  changeCreditCardViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Clients, helpers: { datetimeToDatetimeString } }: TModels
) => {
  const { id } = req.params;
  const { client } = res.locals;
  res.render(
    changeCreditCardViewFile,
    {
      ...changeCreditCardViewProps,
      data: {
        ...client,
        birth_date: datetimeToDatetimeString(client.birth_date),
      },
    },
  );
};
