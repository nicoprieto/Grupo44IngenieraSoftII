// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  upgradePremiumViewFile,
  upgradePremiumViewProps,
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
  // check if client has already a pending upgrade request
  const hasPendingRequest = (await ClientsPendingPremium
    .query()
    .where({
      clients_id: client.id,
      isRemoved: false,
      type: 'upgrade'
    })
  ).length !== 0;
  try {
    res.render(
      upgradePremiumViewFile,
      {
        ...upgradePremiumViewProps,
        client,
        hasPendingRequest,
      },
    );
  } catch(e) {
    console.error('fail get.upgrade.premium', e);
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
