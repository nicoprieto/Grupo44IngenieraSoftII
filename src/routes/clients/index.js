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
  getProfile,
  getUpdate,
  postUpdate,
} from '../../controllers/clients';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModels) => {
  const router = express.Router();

  const validations = {
    name: helpers
      .validator
        .check('name')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese su nombre'),
    surname: helpers
      .validator
        .check('surname')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese su apellido'),
    birth_dateEmpty: helpers
      .validator
        .check('birth_date')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese su fecha de nacimiento'),
    birth_dateIsAdult: helpers
      .validator
      .check('birth_date')
      // check for the good case
      .custom((value) => helpers.isBirthDateAdultAge(value))
      .withMessage('Debe tener mas de 18 años para poder usar el sitio'),
    emailEmpty: helpers
      .validator
        .check('email')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese su email'),
    emailInvalid: helpers
      .validator
        .check('email')
        .isEmail()
        .withMessage('Email ingresado no es valido'),
    document_numberEmpty: helpers
      .validator
        .check('document_number')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese su numero de documento'),
    document_numberInvalid: helpers
      .validator
        .check('document_number')
        // check for the good case
        .custom((value) => !isNaN(value))
        .withMessage('Numero de documento ingresado no es valido'),
    phone: helpers
      .validator
        .check('phone')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese su telefono'),
    address: helpers
      .validator
        .check('address')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese una direccion'),
    pass: helpers
      .validator
        .check('pass')
        .isLength({ min: 6 })
        .withMessage('Por favor ingrese una contrasena valida'),
    respass: helpers
    .validator
      .check('repass')
      .custom((value, { req }) => value === req.body.pass)
      .withMessage('Las contrasena no son coindicentes'),
    credit_card_number: helpers
      .validator
        .check('credit_card_number')
        // check for the good case
        .custom((value) => !isNaN(value))
        .withMessage('Numero de tarjeta de credito es incorrecto'),
    credit_card_expiration: helpers
      .validator
        .check('credit_card_expiration')
        // check for the good case
        .custom((value) => /\d{2}\/\d{2}/.test(value))
        .withMessage('Fecha de expiracion es incorrecto'),
        credit_card_owner: helpers
      .validator
        .check('credit_card_owner')
        .exists({ checkFalsy: true })
        .withMessage('Ingrese nombre del titular de la tarjeta de credito'),
    credit_card_security_code: helpers
      .validator
      .check('credit_card_security_code')
      .custom((value) => /\d{3}/.test(value))
      .withMessage('Codigo de seguridad es invalido'),
  };

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
      validations.name,
      validations.surname,
      validations.birth_dateEmpty,
      validations.birth_dateIsAdult,
      validations.emailEmpty,
      validations.emailInvalid,
      validations.document_numberEmpty,
      validations.document_numberInvalid,
      validations.phone,
      validations.address,
      validations.pass,
      validations.respass,
      validations.credit_card_number,
      validations.credit_card_expiration,
      validations.credit_card_owner,
      validations.credit_card_security_code,
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

  router.get(
    '/:id',
    helpers.guard.requireAny('client/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      if(err.isGuard) {
        res.redirect('/');
      }
    },
    (req: $Request, res: $Response) => getProfile(req, res, helpers, models)
  );

  router.get(
    '/:id/update',
    helpers.guard.requireAny('client/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      if(err.isGuard) {
        res.redirect('/');
      }
    },
    (req: $Request, res: $Response) => getUpdate(req, res, helpers, models)
  );

  router.post(
    '/:id/update',
    helpers.guard.requireAny('client/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      if(err.isGuard) {
        res.redirect('/');
      }
    },
    // $FlowFixMe
    [
      validations.name,
      validations.surname,
      validations.birth_dateEmpty,
      validations.birth_dateIsAdult,
      validations.emailEmpty,
      validations.emailInvalid,
      validations.document_numberEmpty,
      validations.document_numberInvalid,
      validations.phone,
      validations.address,
    ],
    (req: $Request, res: $Response) => postUpdate(req, res, helpers, models)
  );

  return router;
};
