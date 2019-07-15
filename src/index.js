// @flow

import path from 'path';

// ****************
// augment process.env object from .env root file
// ****************

import dotenv from 'dotenv';
dotenv.config();

// ****************
// Init express app
// ****************

import express, { type $Request, type $Response } from 'express';

const port = process.env.PORT || 8080;
const app = express();

// ****************
// Init common middlewares
// ****************

import cors from 'cors';
import bodyParser from 'body-parser';
import morganBody from 'morgan-body';

// logging
morganBody(
  app,
  {
    logResponseBody: false,
  }
);

app.use(express.static('public'));
app.use(express.static('uploads'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/../src/views'));

app.use(cors());
// parse <form /> requests
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json());

// ****************
// Init database
// ****************

import initModels from './models';

// init database models
// $FlowFixMe
const models = initModels(path.resolve(process.env.DATABASE_NAME));
// fail database setup
if(models === null) {
  process.exit(1);
}

// ****************
// Init session
// ****************

import initSession from './auth';

// $FlowFixMe
initSession(app, models.knex);

// ****************
// Init routes
// ****************

import routesHelpers from './routes.helpers';

import admin from './routes/admin';
app.use(
  '/admin',
  // $FlowFixMe
  admin(routesHelpers, models)
);

import adminResidences from './routes/admin.residences';
app.use(
  '/admin/residences',
  // $FlowFixMe
  adminResidences(routesHelpers, models)
);

import adminReservations from './routes/admin.reservations';
app.use(
  '/admin/reservations',
  // $FlowFixMe
  adminReservations(routesHelpers, models)
);

import adminWeeks from './routes/admin.weeks';
app.use(
  '/admin/weeks',
  // $FlowFixMe
  adminWeeks(routesHelpers, models)
);

import adminClients from './routes/admin.clients';
app.use(
  '/admin/clients',
  // $FlowFixMe
  adminClients(routesHelpers, models)
);

import clientsProfile from './routes/clients/profile';
app.use(
  '/clients',
  // $FlowFixMe
  clientsProfile(routesHelpers, models)
);

import clientsLogin from './routes/clients/login';
app.use(
  '/clients',
  // $FlowFixMe
  clientsLogin(routesHelpers, models)
);

import clientsRegister from './routes/clients/register';
app.use(
  '/clients',
  // $FlowFixMe
  clientsRegister(routesHelpers, models)
);

import clientsResidences from './routes/clients/residences';
app.use(
  '/clients/:id/residences',
  // $FlowFixMe
  clientsResidences(routesHelpers, models)
);

import home from './routes/home';
app.use(
  '/',
  // $FlowFixMe
  home(routesHelpers, models)
);

// ****************
// App init
// ****************
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
