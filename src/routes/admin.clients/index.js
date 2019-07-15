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
  onGuardErrorFunction,
} from './middlewares';

import {
  getList,
} from '../../controllers/admin.clients';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModelsWithHelpers) => {
  const router = express.Router({ mergeParams: true });

  // -----------------
  // Routes start here
  // -----------------

  router.get(
    '/',
    helpers.guard.requireAny('admin/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(getList)(R.__, R.__, helpers, models)
  );

  router.get(
    '/search',
    helpers.guard.requireAny('admin/*'),
    R.curry(onGuardErrorFunction)(R.__, R.__, R.__, R.__, helpers, models),
    R.curry(getList)(R.__, R.__, helpers, models)
  );

  return router;
};
