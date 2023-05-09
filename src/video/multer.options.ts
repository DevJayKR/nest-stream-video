import { diskStorage } from 'multer';
import { v4 } from 'uuid';

export const MulterOption = {
  storage: diskStorage({
    destination: __dirname + '/../assets',
    filename(req, file, callback) {
      const filename = v4() + '_' + file.originalname;
      callback(null, filename);
    },
  }),
};
