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
  getChangePass,
  postChangePass,
  getChangeCreditCard,
  postChangeCreditCard,
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
    curPass: helpers
      .validator
        .check('curPass')
        .isLength({ min: 6 })
        .withMessage('Contrasena actual es invalida'),       
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
    credit_card_brand: helpers
      .validator
      .check('credit_card_brand')
      .exists({ checkFalsy: true })
      .withMessage('Ingrese tarjeta de credito marca, por favor'),
    credit_card_number: helpers
      .validator
        .check('credit_card_number')
        // check for the good case
        .custom((value) => /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(value))
        .withMessage('Numero de tarjeta de credito es incorrecto'),
    credit_card_expiration: helpers
      .validator
      .check('credit_card_expiration')
      // check for the good case
      .custom((value) => helpers.isCreditCardExpirationValid(value))
      .withMessage('Fecha de expiracion tarjeta es incorrecto'),
    credit_card_owner: helpers
      .validator
        .check('credit_card_owner')
        .exists({ checkFalsy: true })
        .withMessage('Ingrese nombre del titular de la tarjeta de credito'),
    credit_card_security_code: helpers
      .validator
      .check('credit_card_security_code')
      .custom((value) => /^\d{3}$/.test(value))
      .withMessage('Codigo de seguridad es invalido'),
  };

  const validateSessionClientIdWithParamId = (req: $Request, res: $Response, next: NextFunction) => {
    const { id } = req.params;
    if(
      typeof req.session.clientId === 'undefined' ||
      req.session.clientId.toString() !== id.toString()
    ) {
      res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
    } else {
      next();
    }
  };

  const getClientUsingParamId = async (req: $Request, res: $Response, next: NextFunction) => {
    const { id } = req.params;
    const client = await models.Clients.query().findById(id);
    // extreme rare case
    if(!(client instanceof models.Clients)) {
      res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
    } else {
      // put client in res.locals
      res.locals.client = client;
      next();
    }
  };

  // BUG I dont know how to use cookie sessions
  const onGuardErrorFunction = (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
    if(err.isGuard) {
      // user has been redirect to same url but still is failing
      if(req.originalUrl.includes('try-again')) {
        res.status(helpers.HttpStatusCodes.FORBIDDEN).send();
      } else {
        // destroy session
        req.session.destroy(() => {
          // and redirect again to the same url
          res.redirect(`${req.originalUrl}?try-again`);
        });
      }
    } else {
      next();
    }
  };

  // -----------------
  // Routes start here
  // -----------------

  router.get(
    '/login',
    helpers.guard.requireAny('guest/*'),
    onGuardErrorFunction,
    (req: $Request, res: $Response) => getLogin(req, res, helpers, models)
  );

  router.post(
    '/login',
    helpers.guard.requireAny('guest/*'),
    onGuardErrorFunction,
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
    onGuardErrorFunction,
    (req: $Request, res: $Response) => getRegister(req, res, helpers, models)
  );

  router.post(
    '/register',
    helpers.guard.requireAny('guest/*'),
    onGuardErrorFunction,
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
      validations.credit_card_brand,
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
    onGuardErrorFunction,
    (req: $Request, res: $Response) => getLogout(req, res, helpers, models)
  );

  router.get(
    '/:id',
    helpers.guard.requireAny('client/*'),
    onGuardErrorFunction,
    validateSessionClientIdWithParamId,
    getClientUsingParamId,
    (req: $Request, res: $Response) => getProfile(req, res, helpers, models)
  );

  router.get(
    '/:id/update',
    helpers.guard.requireAny('client/*'),
    onGuardErrorFunction,
    validateSessionClientIdWithParamId,
    getClientUsingParamId,
    (req: $Request, res: $Response) => getUpdate(req, res, helpers, models)
  );

  router.post(
    '/:id/update',
    helpers.guard.requireAny('client/*'),
    onGuardErrorFunction,
    validateSessionClientIdWithParamId,
    getClientUsingParamId,
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

  router.get(
    '/:id/change-pass',
    helpers.guard.requireAny('client/*'),
    onGuardErrorFunction,
    validateSessionClientIdWithParamId,
    getClientUsingParamId,
    (req: $Request, res: $Response) => getChangePass(req, res, helpers, models)
  );

  router.post(
    '/:id/change-pass',
    helpers.guard.requireAny('client/*'),
    onGuardErrorFunction,
    validateSessionClientIdWithParamId,
    getClientUsingParamId,
    // $FlowFixMe
    [
      validations.curPass,
      validations.pass,
      validations.respass,
    ],
    (req: $Request, res: $Response) => postChangePass(req, res, helpers, models)
  );

  router.get(
    '/:id/change-credit-card',
    helpers.guard.requireAny('client/*'),
    onGuardErrorFunction,
    validateSessionClientIdWithParamId,
    getClientUsingParamId,
    (req: $Request, res: $Response) => getChangeCreditCard(req, res, helpers, models)
  );

  router.post(
    '/:id/change-credit-card',
    helpers.guard.requireAny('client/*'),
    onGuardErrorFunction,
    validateSessionClientIdWithParamId,
    getClientUsingParamId,
    // $FlowFixMe
    [
      validations.credit_card_number,
      validations.credit_card_expiration,
      validations.credit_card_owner,
      validations.credit_card_security_code,
    ],
    (req: $Request, res: $Response) => postChangeCreditCard(req, res, helpers, models)
  );

  return router;
};
