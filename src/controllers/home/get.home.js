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
  { Clients, Weeks, Residences }: TModels
) => {
  let { client } = res.locals;
  // if a client show the avaiable residences for being reserved
  let residences = [];
  try {
    // user is logged
    if(client.id !== null) {
      residences = await Residences
        .query()
        .joinRelation('weeks')
      ;
    // show five residences
    } else {
      residences = await Residences
        .query()
        .eager('photos')
        // dont care if they are enable or removed
    }
    res.render(
      homeViewFile,
      {
        ...homeViewProps,
        client,
        residences,
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
