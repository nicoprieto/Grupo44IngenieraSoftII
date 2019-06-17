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
  { Clients, helpers: { datetimeToDatetimeString } }: TModels
) => {
  const errors = helpers.validator.validationResult(req);
  const { id } = req.params;
  const { client } = res.locals;
  if(errors.isEmpty()) {
    const {
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
          data: {
            ...updatedClient,
            birth_date: datetimeToDatetimeString(updatedClient.birth_date),
          },
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
            ...client,
            birth_date: datetimeToDatetimeString(client.birth_date),
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
          ...client,
          birth_date: datetimeToDatetimeString(client.birth_date),
          ...req.body,
        }
      }
    );
  }
};
