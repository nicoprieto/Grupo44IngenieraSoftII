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
morganBody(app);

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

import clients from './routes/clients';
app.use(
  '/clients',
  // $FlowFixMe
  clients(routesHelpers, models)
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
