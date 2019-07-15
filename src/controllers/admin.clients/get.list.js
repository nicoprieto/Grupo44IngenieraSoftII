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
  listViewFile,
  listViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  {
    Clients,
    knex,
    helpers: {
      localedateToDatetimeString,
    },
  }: TModelsWithHelpers
) => {
  const error = req.query.error || '';
  const message = req.query.message || '';
  const name = req.query.name || '';
  const created_at = req.query.created_at || '';
  const type = req.query.type || '';
  let didSearch = false;
  try {
    let data: TClients = [];
    // do need to do searching
    if(
      name !== '' ||
      created_at !== '' ||
      type !== ''
    ) {
      const query = knex('clients');
      if(type !== '' && type !== 'Todos') {
        query.orWhere('type', type);
      }
      if(name !== '') {
        query.orWhere('name', 'like', `%${name}%`);
        query.orWhere('surname', 'like', `%${name}%`);
      }
      if(created_at !== '') {
        query.orWhere(function() {
          this.where('created_at', '>=', localedateToDatetimeString(created_at));
          this.andWhere('created_at', '<=', localedateToDatetimeString(created_at, '23:59:59'));
        });
      }
      data = await query
        .where({ isRemoved: false })
        .orderBy('id', 'DESC')
        .select()
      ;

      didSearch = true;

    } else {
      data = await Clients
        .query()
        .where({ isRemoved: false })
        .orderBy('id', 'DESC')
      ;
    }
    res.render(
      listViewFile,
      {
        ...listViewProps,
        data,
        error,
        message,
        searchParams: {
          name,
          created_at,
          type,
        },
        didSearch,
      }
    );
  } catch(e) {
    console.error('fail Residences.get.list', e);
    res.render(listViewFile, listViewProps);
  }
};
