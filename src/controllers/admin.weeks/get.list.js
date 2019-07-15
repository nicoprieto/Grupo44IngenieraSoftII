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
  { Weeks }: TModels
) => {
  const isDebugMode = typeof req.query.debug !== 'undefined';
  try {
    const data = await Weeks
      .query()
      .eager('[residence, client]')
      .modifyEager(
        'residence',
        (builder) => builder.select('id', 'title')
      )
      .modifyEager(
        'client',
        (builder) => builder.select('id', 'name', 'surname', 'email')
      )
      .where('weeks.isRemoved', false)
      .orderBy('weeks.id', 'DESC')
    ;
    console.log('-------------');
    console.log(data);
    res.render(
      listViewFile,
      {
        ...listViewProps,
        data,
        isDebugMode,
      }
    );
  } catch(e) {
    console.error('fail Weeks.get.list', e);
    res.render(listViewFile, listViewProps);
  }
};
