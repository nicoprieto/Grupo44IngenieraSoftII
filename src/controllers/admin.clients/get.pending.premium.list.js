// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModelsWithHelpers } from '../../models';

import {
  type TClients,
} from '../../models/Clients';

import {
  listPendingPremiumViewFile,
  listPendingPremiumViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  {
    ClientsPendingPremium,
  }: TModelsWithHelpers
) => {
  const error = req.query.error || '';
  const message = req.query.message || '';
  try {
    const data = await ClientsPendingPremium
      .query()
      .eager('client')
      .where({ 'clients_pending_premium.isRemoved': false })
      .orderBy('clients_pending_premium.id', 'DESC')
    ;
    res.render(
      listPendingPremiumViewFile,
      {
        ...listPendingPremiumViewProps,
        data,
        error,
        message,
      }
    );
  } catch(e) {
    console.error('fail database get.pending.premium', e);
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

