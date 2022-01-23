import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../users/user.model';
import config from '../../common/config';

function createToken(id: string, login: string) {
  const payload = {
    id,
    login,
  };
  return jwt.sign(payload, String(config.JWT_SECRET_KEY), { expiresIn: '7d' });
}

const loginRepo = async (login: string, password: string) => {
  const authUser = await getRepository(User).findOne({ login });
  if (!authUser) {
    throw new Error(`User with login ${login} not found`);
  }

  const isValidPassword = bcrypt.compareSync(password, authUser.password);
  if (!isValidPassword) {
    throw new Error(`Invalid password`);
  }
  return { token: createToken(authUser.id, authUser.login) };
};

export default { loginRepo };
