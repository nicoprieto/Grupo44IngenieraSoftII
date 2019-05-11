// @flow

import { type $Application } from 'express';

import expressSession from 'express-session';
import connectSessionKnex from 'connect-session-knex';

export default (app: $Application, knex: any) => {

  // init cookies mechanism
const KnexSessionStore = connectSessionKnex(expressSession);
const store = new KnexSessionStore({
  knex: knex,
});

app.use(expressSession({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000 // ten seconds, for testing
  },
  store,
}));

}