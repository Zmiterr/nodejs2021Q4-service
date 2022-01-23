import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';
import env from '../common/config';

const plugin = fp(
  async (app) => {
    app.addHook('preHandler', async (req, res) => {
      const freeLinks = ['/', '/doc', '/login'];
      const isFreeLinks = () => freeLinks.includes(req.url);

      if (!isFreeLinks()) {
        try {
          res.log.warn({ url: req.url }, 'test');
          const token = req.headers.authorization!.split(' ')[1];
          res.log.warn(
            { url: req.url },
            `${token} ${Object.keys(req.headers)}`
          );
          if (!token) {
            res.status(401).send('Wrong authorization data');
          }
          const isVerify = jwt.verify(token, String(env.JWT_SECRET_KEY));
          res.log.warn({ url: req.url }, `Verify: ${isVerify}`);
        } catch (e) {
          res.status(401).send(e);
        }
      }
    });
  },
  {
    name: 'routeAccess',
  }
);

export default plugin;
