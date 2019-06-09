// @flow

import express, {
  type $Request,
  type $Response,
  type NextFunction,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TGuardError } from '../../routes.helpers/guard';
import { type TModels } from '../../models';

import {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLogout,
} from '../../controllers/clients';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModels) => {
  const router = express.Router();

  router.get(
    '/login',
    helpers.guard.requireAny('guest/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      if(err.isGuard) {
        res.redirect('/');
      }
    },
    (req: $Request, res: $Response) => getLogin(req, res, helpers, models)
  );

  router.post(
    '/login',
    helpers.guard.requireAny('guest/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      if(err.isGuard) {
        res.redirect('/');
      }
    },
    // $FlowFixMe
    [
      helpers
      .validator
      .check('email')
        .isEmail()
        .withMessage('Por favor ingrese su email'),
      helpers
      .validator
      .check('pass')
        .isLength({ min: 6 })
        .withMessage('Por favor ingrese su password'),
    ],
    (req: $Request, res: $Response) => postLogin(req, res, helpers, models)
  );

  router.get(
    '/register',
    helpers.guard.requireAny('guest/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      if(err.isGuard) {
        res.redirect('/');
      }
    },
    (req: $Request, res: $Response) => getRegister(req, res, helpers, models)
  );

  router.post(
    '/register',
    helpers.guard.requireAny('guest/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      if(err.isGuard) {
        res.redirect('/');
      }
    },
    // $FlowFixMe
    [
      helpers
      .validator
        .check('name')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese su nombre'),
      helpers
      .validator
        .check('surname')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese su apellido'),
      helpers
      .validator
        .check('email')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese su email'),
      helpers
      .validator
        .check('email')
        .isEmail()
        .withMessage('Email ingresado no es valido'),
      helpers
      .validator
        .check('document_number')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese su numero de documento'),
      helpers
      .validator
        .check('document_number')
        // check for the good case
        .custom((value) => !isNaN(value))
        .withMessage('Numero de documento ingresado no es valido'),
      helpers
      .validator
        .check('phone')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese su telefono'),
      helpers
      .validator
        .check('address')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese una direccion'),
      helpers
      .validator
        .check('pass')
        .isLength({ min: 6 })
        .withMessage('Por favor ingrese una contrasena valida'),
      helpers
      .validator
        .check('repass')
        .custom((value, { req }) => value === req.body.pass)
        .withMessage('Las contrasena no son coindicentes'),
    ],
    (req: $Request, res: $Response) => postRegister(req, res, helpers, models)
  );

  router.get(
    '/logout',
    helpers.guard.requireAny('client/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      if(err.isGuard) {
        res.redirect('/');
      }
    },
    (req: $Request, res: $Response) => getLogout(req, res, helpers, models)
  );

  return router;
};
