// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  listViewFile,
  listViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Clients }: TModels
) => {
  let { client } = res.locals;
  try {
    client = await client
      .$query()
      .eager('weeks.residence')
    ;
    res.render(
      listViewFile,
      {
        ...listViewProps,
        client,
      }
    );
  } catch(e) {
    console.error('fail get.list', e);
    res.render(listViewFile, listViewProps);
  }
};
