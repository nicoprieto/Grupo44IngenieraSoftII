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
  getRegister,
  postRegister,
} from '../../controllers/clients';

export default (helpers: THelpers, models: TModelsWithHelpers) => {
  const router = express.Router({ mergeParams: true });

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

  return router;

};