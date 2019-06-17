// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import { type TClient } from '../../models/Clients';

import {
  updateViewFile,
  updateViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Clients, helpers: { password } }: TModels
) => {
  const errors = helpers.validator.validationResult(req);
  const { id } = req.params;
  const { client } = res.locals;
  if(errors.isEmpty()) {
    try {
      const clientData = Clients.getFromReqBody(req);
      // check if email is not used
      if((await Clients
        .query()
        .whereNot('id', id)
        .andWhere('email', clientData.email)
        )
        .length !== 0
      ) {
        // already used email
        return res.render(
          updateViewFile,
          {
            ...updateViewProps,
            errors: [
              {
                "location": "body",
                "msg": "Ya existe un cliente con el mismo email ingresado",
                "param": ""
              }
            ],
            // remember req.body has not body, it is on req.params
            data: {
              id,
              ...req.body,
            },
          }
        );
      }
      // update client
      const updatedClient = await client
        .$query()
        .patchAndFetch({
          email: clientData.email,
          name: clientData.name,
          surname: clientData.surname,
          document_number: clientData.document_number,
          phone: clientData.phone,
          address: clientData.address,
        })
      ;
      res.render(
        updateViewFile,
        {
          ...updateViewProps,
          data: updatedClient,
          message: 'Datos actualizados correctamente!',
        }
      );
    // database error
    } catch(e) {
      console.error(e);
      res.render(
        updateViewFile,
        {
          ...updateViewProps,
          errors: [
            {
              "location": "body",
              "msg": "Fallo cambio de contrasena, intente de vuelta",
              "param": ""
            }
          ],
          data: {
            // id is not in req.body, is it req.params
            id,
            ...req.body,
          }
        }
      );      
    }
  // post data submitted is invalid
  } else {
    res.render(
      updateViewFile,
      {
        ...updateViewProps,
        errors: errors.array(),
        data: {
          // id is not in req.body, is it req.params
          id,
          ...req.body,
        }
      }
    );
  }
};
