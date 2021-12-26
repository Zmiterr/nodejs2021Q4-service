// const { PORT } = require('./common/config');
// const app = require('./app');
import app, { logError } from './app';

import evn from './common/config';

(async () => {
  try {
    await app.listen(evn.PORT);
  } catch (err) {
    app.log.error(err);
    logError.error(String(err));
    process.exit(1);
  }
})();
