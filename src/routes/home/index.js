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
  emptyClient,
} from '../../models/Clients'

import {
  getHome,
} from '../../controllers/home';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModels) => {
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

  router.get(
    '/',
    getClientUsingSession,
    (req: $Request, res: $Response) => getHome(req, res, helpers, models)
  );

  return router;
};
