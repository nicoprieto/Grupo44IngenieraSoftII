// $flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  homeViewFile,
  homeViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Clients }: TModels
) => {
  let { data: { client } } = homeViewProps;
  try {
    if(req.session.isClient) {
      client = await Clients.query().findById(req.session.clientId);
      // rare case, cooke has been hacked
      if(!(client instanceof Clients)) {
        res.render(
          homeViewFile,
          homeViewProps
        );
      } else {
        res.render(
          homeViewFile,
          {
            ...homeViewProps,
            data: {
              ...homeViewProps.data,
              client,
            },
          }
        );
      }
    // is guest or admin user
    } else {
      res.render(
        homeViewFile,
        homeViewProps
      );
    }
  // database error
  } catch(e) {
    console.error('fail get.home', e);
    res.render(
      homeViewFile,
      homeViewProps
    );
  }
};
