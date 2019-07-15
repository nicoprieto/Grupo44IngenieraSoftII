// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModelsWithHelpers } from '../../models';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  {
    Clients,
    ClientsPendingPremium,
  }: TModelsWithHelpers
) => {
  const { id } = req.params;
  try {
    const data = await ClientsPendingPremium
      .query()
      .where({
        clients_id: id,
        isRemoved: false,
      })
    ;
    if(data.length === 0) {
      res.redirect(`/admin/clients?error=Usuario no tiene solicitudes pendientes`);
    } else {
      const [ row ] = data;
      await row
        .$query()
        .patch({ isRemoved: true })
      ;
      await Clients
        .query()
        .findById(id)
        .patch({
          type: 'premium'
        })
      ;
      res.redirect('/admin/clients?message=Usuario pasado a premium satisfactoriamente');
    }
  } catch(e) {
    console.error('fail database get.set.type.to.premium', e);
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
