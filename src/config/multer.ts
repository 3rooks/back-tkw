import { Options, diskStorage } from 'multer';
import { extname, parse } from 'path';
import { mimeTypes } from 'src/constants/mimetypes';
import { FILES_PATH } from 'src/utils/paths';
import uuid from 'uuid-random';

export const localOptions: Options = {
    dest: FILES_PATH,
    limits: { fileSize: 10000000 },
    storage: diskStorage({
        destination: FILES_PATH,
        filename: (req, file, cb) => {
            cb(
                null,
                `${parse(file.originalname).name}-${uuid()}${extname(
                    file.originalname
                )}`
            );
        }
    }),
    fileFilter: (req, file, cb) => {
        if (!Object.values(mimeTypes).includes(file.mimetype)) {
            cb(null, false);
        } else cb(null, true);
    }
};
