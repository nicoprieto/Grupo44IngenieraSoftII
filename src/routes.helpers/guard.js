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
      return req.session.isAdmin;
    },
  });

  const guard = new Guard();

  guard.roles.addRole(admin);

  return guard;
};
