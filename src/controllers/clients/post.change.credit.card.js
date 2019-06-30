// $flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  changeCreditCardViewFile,
  changeCreditCardViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Clients }: TModels
) => {
  const errors = helpers.validator.validationResult(req);
  const { id } = req.params;
  const { client } = res.locals;
  if(errors.isEmpty()) {
    const {
      credit_card_brand,
      credit_card_number,
      credit_card_expiration,
      credit_card_owner,
      credit_card_security_code,
    } = req.body;
    try {
      // update client
      const updatedClient = await client
        .$query()
        .patchAndFetch({
          credit_card_brand,
          credit_card_number,
          credit_card_expiration,
          credit_card_owner,
          credit_card_security_code,
        })
      ;
      res.render(
        changeCreditCardViewFile,
        {
          ...changeCreditCardViewProps,
          data: Clients.formatClient(updatedClient),
          message: 'Datos actualizados correctamente!',
        }
      );
    // database error
    } catch(e) {
      res.render(
        changeCreditCardViewFile,
        {
          ...changeCreditCardViewProps,
          errors: [
            {
              "location": "body",
              "msg": "Fallo cambio de contrasena, intente de vuelta",
              "param": ""
            }
          ],
          data: {
            ...Clients.formatClient(client),
            ...req.body,
          },
        }
      );
    }
  } else {
    res.render(
      changeCreditCardViewFile,
      {
        ...changeCreditCardViewProps,
        errors: errors.array(),
        data: {
          ...Clients.formatClient(client),
          ...req.body,
        }
      }
    );
  }
};
