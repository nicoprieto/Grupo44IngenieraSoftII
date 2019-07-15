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

import {
  getList,
} from '../../controllers/clients.reservations';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModelsWithHelpers) => {
  const router = express.Router({ mergeParams: true });

  router.get(
    '/',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getList)(R.__, R.__, helpers, models),
  );
  
  return router;
};
