// $flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import {
  changePassViewFile,
  changePassViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Clients, helpers: { datetimeToDatetimeString } }: TModels
) => {
  const { id } = req.params;
  // can view details client if session is not the same as param
  if(
    typeof req.session.clientId === 'undefined' ||
    req.session.clientId.toString() !== id.toString()
  ) {
    return res.redirect('/');
  }
  const client = await Clients.query().findById(id);
  // extreme rare case
  if(!(client instanceof Clients)) {
    res.redirect('/');
  } else {
    res.render(
      changePassViewFile,
      {
        ...changePassViewProps,
        data: {
          ...client,
          birth_date: datetimeToDatetimeString(client.birth_date),
        },
      },
    );
  }   
};
