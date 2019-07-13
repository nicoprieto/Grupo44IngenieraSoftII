// $flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  createViewFile,
  createViewProps,
} from './constants';

import {
  type TWeek,
} from '../../models/Weeks'

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Weeks, Residences }: TModels
) => {
  const isDebugMode = typeof req.query.debug !== 'undefined';
  const data: TWeek = Weeks.getCurrentWeek();
  try {
    const residences = await Residences
      .query()
      .select('id', 'title')
      .where({
        isRemoved: false,
        isEnabled: true,
      })
    ;
    // check if we can create a week
    const isEnabled = isDebugMode || 
      (await Weeks
        .query()
        .innerJoinRelation('residence')
        .where({
          number: data.number,
          year: data.year,
        })
        .count({ length: 'weeks.id' })
        .first()
      ).length === 0
    ;
    res.render(
      createViewFile,
      {
        ...createViewProps,
        data,
        isEnabled,
        isDebugMode,
        residences,
      }
      );
  } catch(e) {
    console.error('fail get.create', e);
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
