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
  getHome,
} from '../../controllers/home';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModels) => {
  const router = express.Router();

  router.get(
    '/',
    (req: $Request, res: $Response) => getHome(req, res, helpers, models)
  );

  return router;
};
