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
  residenceViewFile,
  residenceViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Clients, Weeks, Residences }: TModels
) => {
  let { client } = res.locals;
  const id = req.params['0'];
  try {
    const residence = await Residences
      .query()
      .findById(id)
      .eager('[photos, weeks]')
      .joinRelation('weeks')
      .where({ 
        'residences.isRemoved': false,
      })
    ;
    if(residence instanceof Residences) {
      res.render(
        residenceViewFile,
        { 
          ...residenceViewProps,
          residence,
          client,
        }
      );
    // id is removed or missing
    } else {
      res.status(helpers.HttpStatusCodes.BAD_REQUEST).send();
    }
    // database error
  } catch(e) {
    console.error('fail get.residence', e);
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
