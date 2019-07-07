// @flow

import express, {
  type $Request,
  type $Response,
  type NextFunction,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TGuardError } from '../../routes.helpers/guard';
import { type TModelsWithHelpers } from '../../models';

import {
  emptyClient,
} from '../../models/Clients'

import {
  getResidences,
  getResidence,
} from '../../controllers/home';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModelsWithHelpers) => {
  const router = express.Router();

  const getClientUsingSession = async (req: $Request, res: $Response, next: NextFunction) => {
    let client = emptyClient;
    if(req.session.clientId) {
      const id = req.session.clientId;
      client = await models.Clients.query().findById(id);
      // extreme rare case
      if(!(client instanceof models.Clients)) {
        return res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
      }
    }
    // put client in res.locals
    res.locals.client = client;
    next();
  };

  const onGuardErrorFunction = (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
    // redirect to login is user doest have admin/* permission
    if(err.isGuard) {
      res.redirect('/clients/login');
    } else {
      next();
    }
  };

  router.get(
    '/',
    getClientUsingSession,
    (req: $Request, res: $Response) => getResidences(req, res, helpers, models)
  );

  router.get(
    /^\/residences\/(\d+)$/,
    helpers.guard.requireAny('client/*'),
    onGuardErrorFunction,
    getClientUsingSession,
    (req: $Request, res: $Response) => getResidence(req, res, helpers, models)
  );

  router.get(
    '/residences/search',
    helpers.guard.requireAny('client/*'),
    onGuardErrorFunction,
    getClientUsingSession,
    // $FlowFixMe
    [
      helpers
      .validator
      .check('city')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese una localidad'),
      helpers
      .validator
      .check('start_date')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese fecha comienzo')
        // look for the good case
        .custom((start_date: string) => {
          const d = helpers.moment(start_date, 'DD/MM/YYYY');
          const now = helpers.moment();
          const diff = d.diff(now, 'months');
          const isValid = diff >= 6;
          if(isValid) {
            return Promise.resolve(true);
          } else {
            const nextSixMonths = now.add(6, 'months').format('MM/YYYY');
            return Promise.reject(`Solo puede buscar a partir del mes ${nextSixMonths}`);
          }
        }),
      helpers
      .validator
      .check('end_date')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese fecha fin')
        .custom((end_date: string, { req }: { req: $Request }) => {
          const { start_date } = req.query;
          const d1 = helpers.moment(start_date, 'DD/MM/YYYY');
          const d2 = helpers.moment(end_date, 'DD/MM/YYYY');
          const diff = d2.diff(d1, 'months');
          return diff <= 2;
        })
        .withMessage('Rango de busqueda solo puede ser de 2 meses maximo')
    ],
    (req: $Request, res: $Response) => getResidences(req, res, helpers, models)
  );


  return router;
};
