// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import { type TClient } from '../../models/Clients';

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
  const { id } = req.params;
  const { client } = res.locals;
  try {
    const insertData = ClientsPendingPremium.getFromReqBody(req, id, 'upgrade');
    await ClientsPendingPremium
      .query()
      .insert(insertData)
    ;
    res.render(
      upgradePremiumViewFile,
      {
        ...upgradePremiumViewProps,
        client,
        didPost: true,
      }
    );
  // database error
  } catch(e) {
    console.error('fail post.upgrade.premium', e);
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
