// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  residenceUpdateViewFile,
  residenceUpdateViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Residences, ResidencesPhotos }: TModels
) => {
  const id = req.params.id;
  const residence = await Residences
    .query()
    .findById(id)
    .eager('photos')
    .modifyEager(
      'photos',
      (builder) => builder.where('isRemoved', false)
    )
  ;
  if(residence instanceof Residences) {
    res.render(
      residenceUpdateViewFile,
      {
        ...residenceUpdateViewProps,
        data: { ...residence },
      }
    );
  } else {
    res.redirect('/admin/residences');
  } 
};
