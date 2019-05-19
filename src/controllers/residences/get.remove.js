// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  residenceRemoveViewFile,
  residenceRemoveViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Residences }: TModels
) => {
  const id = req.params.id;
  const residence = await Residences.query().findById(id);
  if(residence instanceof Residences) {
    res.render(
      residenceRemoveViewFile,
      {
        ...residenceRemoveViewProps,
        data: { ...residence },
      }
    );
  } else {
    res.redirect('/admin/residences');
  } 
};
