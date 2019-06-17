// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModelsWithHelpers } from '../../models';

import { type TClient } from '../../models/Clients';

import {
  registerViewFile,
  registerViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Clients, helpers: { password } }: TModelsWithHelpers
) => {
  const errors = helpers.validator.validationResult(req);
  if(errors.isEmpty()) {
    try {
      const clientData = Clients.getFromReqBody(req);
      // check if email is not used
      if((await Clients
        .query()
        .where('email', clientData.email)
        )
        .length !== 0
      ) {
        // already used email
        return res.render(
          registerViewFile,
          {
            ...registerViewProps,
            errors: [
              {
                "location": "body",
                "msg": "Ya existe un cliente con el mismo email ingresado",
                "param": ""
              }
            ],
            data: {
              id: null,
              ...req.body,
            }
          }
        );
      }
      // hash pass
      const hashedPassword = await password.generatePassword(clientData.pass);
      // create client
      const client = await Clients
        .query()
        .insert({
          ...clientData,
          pass: hashedPassword,
        });
      // set client session
      req.session.isClient = true;
      req.session.clientId = client.id;
      // redirect to home after creation
      res.redirect('/');
    // database error
    } catch(e) {
      console.error(e);
      res.render(
        registerViewFile,
        {
          ...registerViewProps,
          errors: [
            {
              "location": "body",
              "msg": "Fallo registro cliente, intente de vuelta",
              "param": ""
            }
          ],
          data: {
            id: null,
            ...req.body,
          },
        }
      );
    }
  // post data submitted is invalid
  } else {
    res.render(
      registerViewFile,
      {
        ...registerViewProps,
        errors: errors.array(),
        data: {
          id: null,
          ...req.body,
        }
      }
    );
  }
};
