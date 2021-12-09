import User from './user.model';

export type UserToResponse = Omit<User, 'password'>;
