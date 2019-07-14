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
  getLogout,
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
    '/logout',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(getLogout)(R.__, R.__, helpers, models)
  );

  return router

};
