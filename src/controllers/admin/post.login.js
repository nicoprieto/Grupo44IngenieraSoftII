// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModelsWithHelpers } from '../../models';

import {
  loginViewFile,
  loginViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Users, helpers: { password } }: TModelsWithHelpers
) => {
  const errors = helpers.validator.validationResult(req);
  if(errors.isEmpty()) {
    const { email, pass } = req.body;
    try {
      const user = await Users.query().where({ email });
      // no existe user con el email ingresado
      if(user.length === 0) {
        res.render(
          loginViewFile,
          {
            ...loginViewProps,
            errors: [
              {
                location: "body",
                msg: "Email no es existe en nuestro sistema",
                param: "email"
              }
            ],
            data: {
              email,
            },
          }
        );
      } else {
        const [ foundUser ] = user;
        const hashedPassword = foundUser.pass;
        // check if submitted password is like the hashedpassword
        // that is stored in the user table
        if(await password.verifyPassword(pass, hashedPassword)) {
          // set session to persist that this is an admin user
          req.session.isAdmin = true;
          res.redirect('/admin/dashboard');
        } else {
          res.render(
            loginViewFile,
            {
              ...loginViewProps,
              errors: [
                {
                  "location": "body",
                  "msg": "Contrasena es incorrecta",
                  "param": "pass"
                }
              ],
              data: {
                email,
              },
            }
          );
        }
      }
    // database error
    } catch(e) {
      console.error(e);
      res.render(
        loginViewFile,
        {
          ...loginViewProps,
          errors: [
            {
              "location": "body",
              "msg": "Fallo el ingreso intente de vuelta",
              "param": ""
            }
          ],
          data: {
            email,
          },
        }
      );
    }
  // post data submitted is invalid
  } else {
    res.render(
      loginViewFile,
      {
        ...loginViewProps,
        errors: errors.array(),
        data: {
          email: req.body.email,
          // dont send pass
        },
      }
    );
  }
};
