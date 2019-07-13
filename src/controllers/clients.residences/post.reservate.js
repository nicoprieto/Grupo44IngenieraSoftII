// $flow

import { transaction } from 'objection';

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModelsWithHelpers } from '../../models';

import {
  type TClient,
  emptyClient,
} from '../../models/Clients';

import {
  type TResidence,
} from '../../models/Residences';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  {
    Clients,
    Weeks,
    Residences,
    knex,
  }: TModelsWithHelpers
) => {
  let {
    client,
    residence,
  }: {
    client: TClient,
    residence: TResidence, 
  }= res.locals;
  const errors = helpers.validator.validationResult(req);
  if(errors.isEmpty()) {
    const {
      weeks_id,
    } = req.body;

    // this is mostly to stop flowjs to stop complaing
    const residences_id = residence.id || 0;

    if(client.type === 'normal') {
      return res.redirect(`/residences/${residences_id}?error=Debe ser usuario premium para poder reservar`);
    }

    if(client.creditPoints === 0) {
      return res.redirect(`/residences/${residences_id}?error=No tiene mas creditos`);
    }

    try {
      const transactionResult = await transaction(knex, async (trx) => {
        await client
          .$query(trx)
          .patch({ 
            creditPoints: client.creditPoints - 1,
          })
        ;

        const week = await Weeks
          .query(trx)
          .patchAndFetchById(
            weeks_id,
            {
              clients_id: client.id,
              residences_id,
              purchase_method: 'premium',
            }
          )
        ;

        return week instanceof Weeks;
      });
      if(transactionResult) {
        res.redirect(`/residences/${residences_id}?reservated`);
      // something bad happens
      } else {
        res.status(helpers.HttpStatusCodes.BAD_REQUEST).send();
      }
      // database error
    } catch(e) {
      console.error('fail post.reservate', e);
      res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  } else {
    // solo se rompe si esta metiendo mano en post
    console.error('fail post.reservate', errors.array());
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
