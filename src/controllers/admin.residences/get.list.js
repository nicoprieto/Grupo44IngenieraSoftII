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
  { Residences }: TModels
) => {
  try {
    res.render(
      listViewFile,
      {
        ...listViewProps,
        data: await Residences.query().where({ isRemoved: false }).orderBy('id', 'DESC'),
      }
    );
  } catch(e) {
    console.error('fail Residences.get.list', e);
    res.render(listViewFile, listViewProps);
  }
};
