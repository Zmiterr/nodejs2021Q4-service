import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyReq } from '../types';
import loginRepo from './login.memory.repository';
import User from '../users/user.model';

const loginUser = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const { body } = req as FastifyReq<User>;
    const user = await loginRepo.loginRepo(body.login, body.password);
    res.status(201).send(user);
  } catch (err) {
    throw new Error(String(err));
  }
};

export default { loginUser };
