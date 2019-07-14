// @flow

import Guard from 'express-guard';

export type TGuard = {
  requireAny: (...can: Array<string>) => any,
};

export type TGuardError = Error | {
  isGuard: bool,
};

export default () => {

  const admin = new Guard.Role('admin', {
    can: ['admin/*'],
    func: async (req) => {
      return req.session.isAdmin === true;
    },
  });

  const client = new Guard.Role('client', {
    can: ['client/*'],
    func: async (req) => {
      return req.session.isClient === true;
    },
  });

  const guest = new Guard.Role('guest', {
    can: ['guest/*'],
    func: async (req) => {
      return !req.session.isClient && !req.session.isAdmin;
    },
  });

  const guard = new Guard();

  guard.roles.addRole(admin);
  guard.roles.addRole(client);
  guard.roles.addRole(guest);

  return guard;
};
