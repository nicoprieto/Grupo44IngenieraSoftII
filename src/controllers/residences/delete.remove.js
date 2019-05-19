// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Residences }: TModels
) => {
  const id = req.params.id;
  const residence = await Residences.query().findById(id);
  if(residence instanceof Residences) {
    try {
      /*
      const r1 = await residence.$relatedQuery('photos').delete();
      const r2 = await Residences.query().findById(id).delete();
      */
      await Residences.query().findById(id).patch({ isRemoved: true });
      res.redirect('/admin/residences');
    } catch(e) {
      // fail database
      console.error(e);
      res.redirect('/admin/residences');
    }
  } else {
    res.redirect('/admin/residences');
  } 
};
