// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  downgradePremiumViewFile,
  downgradePremiumViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  {
    ClientsPendingPremium,
  }: TModels
) => {
  const { client } = res.locals;
  // check if client has already a pending downgrade request
  const hasPendingRequest = (await ClientsPendingPremium
    .query()
    .where({
      clients_id: client.id,
      isRemoved: false,
      type: 'downgrade'
    })
  ).length !== 0;
  try {
    res.render(
      downgradePremiumViewFile,
      {
        ...downgradePremiumViewProps,
        client,
        hasPendingRequest,
      },
    );
  } catch(e) {
    console.error('fail get.downgrade.premium', e);
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
