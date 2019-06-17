// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModelsWithHelpers } from '../../models';

import { type TClient } from '../../models/Clients';

import {
  changePassViewFile,
  changePassViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Clients, helpers: { password } }: TModelsWithHelpers
) => {
  const errors = helpers.validator.validationResult(req);
  const { id } = req.params;
  const { client } = res.locals;
  if(errors.isEmpty()) {
    try {
      const {
        curPass,
        pass,
        rePass,
      } = req.body;
      // contrasena acutal no es igual a la guarda
      if(!(await password.verifyPassword(curPass, client.pass))) {
        return res.render(
          changePassViewFile,
          {
            ...changePassViewProps,
            data: Clients.formatClient(client),
            errors: [
              {
                "location": "body",
                "msg": "Contrasena actual ingresa no coincide con la guardada en la base de datos",
                "param": "curPass"
              }
            ],
          },
        );
      }
      // hashed new pass
      const hashedNewPassword = await password.generatePassword(pass);
      // and update
      await client
        .$query()
        .patch({
          pass: hashedNewPassword,
        });
      res.render(
        changePassViewFile,
        {
          ...changePassViewProps,
          data: Clients.formatClient(client),
          message: 'Contraseña actualizada correctamente!',
        }
      );
    // database error
    } catch(e) {
      console.error(e);
      res.render(
        changePassViewFile,
        {
          ...changePassViewProps,
          errors: [
            {
              "location": "body",
              "msg": "Fallo cambio de contrasena, intente de vuelta",
              "param": ""
            }
          ],
          data: {
            id,
          },
        }
      );
    }
  // post data submitted is invalid
  } else {
    res.render(
      changePassViewFile,
      {
        ...changePassViewProps,
        errors: errors.array(),
        data: {
          id,
        },
      }
    );
  }
};
