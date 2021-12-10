// const { PORT } = require('./common/config');
// const app = require('./app');
import app from './app';

// import { PORT } from './common/config');

(async () => {
  try {
    await app.listen(4000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
