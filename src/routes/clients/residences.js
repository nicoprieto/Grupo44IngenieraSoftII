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
  getResidenceUsingParamId,
  onGuardErrorFunction,
} from './middlewares';

import Validators from './validators';

import {
  postReservate
} from '../../controllers/clients.residences';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModelsWithHelpers) => {
  const router = express.Router({ mergeParams: true });

  // -----------------
  // Routes start here
  // -----------------

  router.post(
    '/:residenceId',
    helpers.guard.requireAny('client/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(validateSessionClientIdWithParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getClientUsingParamId)(R.__, R.__, R.__, helpers, models),
    R.curry(getResidenceUsingParamId)(R.__, R.__, R.__, helpers, models),
    [
      Validators.weeks_id,
    ],
    R.curry(postReservate)(R.__, R.__, helpers, models)
  );

  return router;
};
