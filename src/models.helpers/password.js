// @flow

import Scrypt from 'scrypt-kdf';

export type TPassword = {
  generatePassword: (string) => Promise<string>,
  verifyPassword: (string, string) => Promise<bool>,
};

export default {

  async generatePassword(pass: string): Promise<string> {
    return (await Scrypt.kdf(pass, { logN: 15 })).toString('hex');
  },

  async verifyPassword(unhashedPassword: string, hashedPassword: string): Promise<bool> {
    const keyBuf = Buffer.from(hashedPassword, 'hex');
    const ok = await Scrypt.verify(keyBuf, unhashedPassword);
    return ok;
  },

};
