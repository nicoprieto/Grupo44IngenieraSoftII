// @flow

import express, {
  type $Request,
  type $Response,
  type NextFunction,
} from 'express';

import R from 'ramda';

import { type THelpers } from '../../routes.helpers';
import { type TGuardError } from '../../routes.helpers/guard';
import { type TModelsWithHelpers } from '../../models';

import {
  validateSessionClientIdWithParamId,
  getClientUsingParamId,
  onGuardErrorFunction,
} from './middlewares';

import Validators from './validators';

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

export default (helpers: THelpers, models: TModelsWithHelpers) => {
  const router = express.Router({ mergeParams: true });

  // -----------------
  // Routes start here
  // -----------------

  router.get(
    '/login',
    helpers.guard.requireAny('guest/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(getLogin)(R.__, R.__, helpers, models)
  );

  router.post(
    '/login',
    helpers.guard.requireAny('guest/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    // $FlowFixMe
    [
      Validators.emailEmpty,
      Validators.pass,
    ],
    R.curry(postLogin)(R.__, R.__, helpers, models)
  );

  router.get(
    '/register',
    helpers.guard.requireAny('guest/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(getRegister)(R.__, R.__, helpers, models)
  );

  router.post(
    '/register',
    helpers.guard.requireAny('guest/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    // $FlowFixMe
    [
      Validators.name,
      Validators.surname,
      Validators.birth_dateEmpty,
      Validators.birth_dateIsAdult,
      Validators.emailEmpty,
      Validators.emailInvalid,
      Validators.document_numberEmpty,
      Validators.document_numberInvalid,
      Validators.phone,
      Validators.address,
      Validators.pass,
      Validators.respass,
      Validators.credit_card_brand,
      Validators.credit_card_number,
      Validators.credit_card_expiration,
      Validators.credit_card_owner,
      Validators.credit_card_security_code,
    ],
    R.curry(postRegister)(R.__, R.__, helpers, models)
  );

  router.get(
    '/logout',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(getLogout)(R.__, R.__, helpers, models)
  );

  router.get(
    '/:id',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getProfile)(R.__, R.__, helpers, models)
  );

  router.get(
    '/:id/update',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getUpdate)(R.__, R.__, helpers, models)
  );

  router.post(
    '/:id/update',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    // $FlowFixMe
    [
      Validators.name,
      Validators.surname,
      Validators.birth_dateEmpty,
      Validators.birth_dateIsAdult,
      Validators.emailEmpty,
      Validators.emailInvalid,
      Validators.document_numberEmpty,
      Validators.document_numberInvalid,
      Validators.phone,
      Validators.address,
    ],
    R.curry(postUpdate)(R.__, R.__, helpers, models),
  );

  router.get(
    '/:id/change-pass',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getChangePass)(R.__, R.__, helpers, models),
  );

  router.post(
    '/:id/change-pass',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    // $FlowFixMe
    [
      Validators.curPass,
      Validators.pass,
      Validators.respass,
    ],
    R.curry(postChangePass)(R.__, R.__, helpers, models),
  );

  router.get(
    '/:id/change-credit-card',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getChangeCreditCard)(R.__, R.__, helpers, models),
  );

  router.post(
    '/:id/change-credit-card',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    // $FlowFixMe
    [
      Validators.credit_card_brand,
      Validators.credit_card_number,
      Validators.credit_card_expiration,
      Validators.credit_card_owner,
      Validators.credit_card_security_code,
    ],
    R.curry(postChangeCreditCard)(R.__, R.__, helpers, models),
  );

  return router;
};
