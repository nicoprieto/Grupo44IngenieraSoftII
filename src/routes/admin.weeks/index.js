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
} from '../../controllers/weeks';

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
        .check('number')
        // look for the good case
        .custom((value) => !isNaN(value))
        .withMessage('Por escriba un numero de semana valido'),

      helpers
      .validator
        .check('year')
        .custom((value) => !isNaN(value))
        .withMessage('Por escriba un anio valido'),

      helpers
        .validator
          .check('residences_id')
          .isArray()
          .custom((value) => value.length > 0)
          .withMessage('Por escriba seleccione alguna residencia'),  

        // TODO: how to test isEnabled?
    ],
    (req: $Request, res: $Response) => postCreate(req, res, helpers, models),
  );

  return router;
};
