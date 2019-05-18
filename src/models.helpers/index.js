// @flow

import password, { type TPassword } from './password';
import now, { type TNow } from './now';

export type THelpers = {
  password: TPassword,
  now: TNow,
};

export default {
  password,
  now,
};
