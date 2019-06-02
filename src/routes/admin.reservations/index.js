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
  getList,
  getCreate,
  postCreate,
  getUpdate,
} from '../../controllers/reservations';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModels) => {
  const router = express.Router({ mergeParams: true });

  router.get(
    '/',
    helpers.guard.requireAny('admin/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      // redirect to login is user doest have admin/* permission
      if(err.isGuard) {
        res.redirect('/admin/login');
      }
    },
    (req: $Request, res: $Response) => getList(req, res, helpers, models)
  );

  // HINT put before /:id to avoid falling in that route
  router.get(
    '/create',
    helpers.guard.requireAny('admin/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      // redirect to login is user doest have admin/* permission
      if(err.isGuard) {
        res.redirect('/admin/login');
      }
    },
    (req: $Request, res: $Response) => getCreate(req, res, helpers, models)
  );

  router.post(
    '/create',
    helpers.guard.requireAny('admin/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      // redirect to login is user doest have admin/* permission
      if(err.isGuard) {
        res.redirect('/admin/login');
      }
    },
    // $FlowFixMe
    [
      helpers
      .validator
        .check('residences_id')
        // look for the good case
        .custom((value) => parseInt(value, 10) > 0)
        .withMessage('Por favor seleccione una residencia'),

      helpers
      .validator
        .check('premium_date_start')
        .exists({ checkFalsy: true })
        .withMessage('Por favor rango comienzo para Premium'),

      helpers
      .validator
        .check('premium_date_end')
        .exists({ checkFalsy: true })
        .withMessage('Por favor rango fin para Premium'),

      helpers
      .validator
        .check('bidding_date_start')
        .exists({ checkFalsy: true })
        .withMessage('Por favor rango comienzo para Subasta'),

      helpers
      .validator
        .check('bidding_date_end')
        .exists({ checkFalsy: true })
        .withMessage('Por favor rango fin para Subasta'),

      // hotsale_date_start is not required
      // hotsale_date_end is not required

      // TODO: how to test isEnabled?
    ],
    (req: $Request, res: $Response) => postCreate(req, res, helpers, models),
  );

  router.get(
    '/:id',
    helpers.guard.requireAny('admin/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      // redirect to login is user doest have admin/* permission
      if(err.isGuard) {
        res.redirect('/admin/login');
      }
    },
    (req: $Request, res: $Response) => getUpdate(req, res, helpers, models)
  );

  return router;
};
