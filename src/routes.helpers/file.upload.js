// @flow

import multer from 'multer';
import appRoot from 'app-root-path';

export type TFileUpload = (
  destinationFolder: string,
  fileExtension: string,
  fields: Array<string>,
) => any;

export default (
  destinationFolder: string,
  fileExtension: string,
  fields: Array<string>
) => {
  const storage = multer.diskStorage({
    destination: `${appRoot}/uploads/${destinationFolder}`,
    filename: (req, file, next) => {
      const filename = `${Date.now()}-${Math.random()}-${file.fieldname}.${fileExtension}`;
      return next(null, filename);
    }
  });
  return multer({ storage }).fields(fields.map((field) => ({ name: field })));
};
