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
  getProfile,
  getUpdate,
  postUpdate,
  getChangePass,
  postChangePass,
  getChangeCreditCard,
  postChangeCreditCard,
  getUpgradePremium,
  postUpgradePremium,
  getDowngradePremium,
  postDowngradePremium,
} from '../../controllers/clients';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModelsWithHelpers) => {
  const router = express.Router({ mergeParams: true });

  router.get(
    '/:id(\\d+)/',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getProfile)(R.__, R.__, helpers, models)
  );

  router.get(
    '/:id(\\d+)/update',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getUpdate)(R.__, R.__, helpers, models)
  );

  router.post(
    '/:id(\\d+)/update',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
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
    '/:id(\\d+)/change-pass',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getChangePass)(R.__, R.__, helpers, models),
  );

  router.post(
    '/:id(\\d+)/change-pass',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    [
      Validators.curPass,
      Validators.pass,
      Validators.respass,
    ],
    R.curry(postChangePass)(R.__, R.__, helpers, models),
  );

  router.get(
    '/:id(\\d+)/change-credit-card',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getChangeCreditCard)(R.__, R.__, helpers, models),
  );

  router.post(
    '/:id(\\d+)/change-credit-card',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    [
      Validators.credit_card_brand,
      Validators.credit_card_number,
      Validators.credit_card_expiration,
      Validators.credit_card_owner,
      Validators.credit_card_security_code,
    ],
    R.curry(postChangeCreditCard)(R.__, R.__, helpers, models),
  );

  router.get(
    '/:id(\\d+)/upgrade-premium',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getUpgradePremium)(R.__, R.__, helpers, models),
  );

  router.post(
    '/:id(\\d+)/upgrade-premium',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(postUpgradePremium)(R.__, R.__, helpers, models),
  );

  router.get(
    '/:id(\\d+)/downgrade-premium',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getDowngradePremium)(R.__, R.__, helpers, models),
  );

  router.post(
    '/:id(\\d+)/downgrade-premium',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(postDowngradePremium)(R.__, R.__, helpers, models),
  );
  
  return router;
};
