// $flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  emptyClient,
} from '../../models/Clients';

import {
  homeViewFile,
  homeViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Clients, Weeks }: TModels
) => {
  let { client } = homeViewProps;
  try {
    const weeks = await Weeks
      .query()
      .eager('[residence, residence.photos]')
      .where('weeks.isEnabled', true)
      .andWhere('weeks.isRemoved', false)
    ;
    if(req.session.isClient) {
      client = await Clients.query().findById(req.session.clientId);
      // rare case, cooke has been hacked
      if(!(client instanceof Clients)) {
        client = emptyClient;
      }
    }
    res.render(
      homeViewFile,
      {
        ...homeViewProps,
        client,
        weeks,
      }
    );
  // database error
  } catch(e) {
    console.error('fail get.home', e);
    res.render(
      homeViewFile,
      homeViewProps
    );
  }
};
