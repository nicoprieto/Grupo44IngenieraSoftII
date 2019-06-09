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
  try {
    res.render(
      listViewFile,
      {
        ...listViewProps,
        data: await Weeks
          .query()
          .joinEager('residence')
          .modifyEager(
            'residence',
            (builder) => builder.select('residences.id', 'title')
          )
          .where('weeks.isRemoved', false)
          .orderBy('weeks.id', 'DESC'),
      }
    );
  } catch(e) {
    console.error('fail Weeks.get.list', e);
    res.render(listViewFile, listViewProps);
  }
};
