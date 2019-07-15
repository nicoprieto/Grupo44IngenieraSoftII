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
  {
    Residences,
    Weeks,
  }: TModels
) => {
  const { id } = req.params;
  const residence = await Residences.query().findById(id);
  if(residence instanceof Residences) {
    try {
      const weeks = await Weeks
        .query()
        .whereNotNull('clients_id')
        .andWhere({
          residences_id: id,
          isRemoved: false,
        })
      ;
      // cannot remove a residence with weeks (reservated)
      if(weeks.length !== 0) {
        res.redirect('/admin/residences?error=La residencia tiene reservas hechas o actualmente esta disponible para ser reservada');
      } else {
        await residence
          .$query()
          .patch({ isRemoved: true })
        ;
        await Weeks
          .query()
          .whereNull('clients_id')
          .andWhere({
            residences_id: id,
          })
          .delete()
        ;
        res.redirect('/admin/residences?message=Residencia borrada correctamente');
      }
    } catch(e) {
      // fail database
      console.error('fail post.remove', e);
      res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  } else {
    console.error('fail post.remove', id);
    res.status(helpers.HttpStatusCodes.BAD_REQUEST).send();
  } 
};
