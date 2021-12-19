// const { PORT } = require('./common/config');
// const app = require('./app');
import app from './app';

import evn from './common/config';

(async () => {
  try {
    await app.listen(evn.PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
