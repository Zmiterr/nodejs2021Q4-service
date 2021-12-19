import { inMemoryDB } from '../../inMemoryDB';
import User from './user.model';
import Task from '../tasks/task.model';
import { UserToResponse } from './types';

/**
 * returns all users
 * @returns array of User objects
 */
const getAll = async (): Promise<UserToResponse[]> => inMemoryDB.users;

/**
 * get user by id
 * @param  id - user id
 * @returns  User object
 */
const getUser = async (id: string): Promise<UserToResponse> => {
  const userById = inMemoryDB.users.filter((user: User) => user.id === id)[0];
  if (!userById) {
    throw new Error(`User with id ${id} not found`);
  }
  return User.toResponse(userById);
};

/**
 * creates new user
 * @param user - user data
 * @returns User object
 */
const createUser = async (user: User): Promise<UserToResponse> => {
  const newUser = new User(user);
  inMemoryDB.users.push(newUser);
  return User.toResponse(newUser);
};

/**
 * updates user by id
 * @param id - user id
 * @param updateData - User data
 * @returns User object
 */
const updateUser = async (
  id: string,
  updateData: UserToResponse
): Promise<UserToResponse> => {
  if (inMemoryDB.users.findIndex((user: User) => user.id === id) === -1) {
    throw new Error(`User with id ${id} not found`);
  }
  const userIndex = inMemoryDB.users.findIndex((user: User) => user.id === id);
  let updatedUser: User = inMemoryDB.users[userIndex];
  updatedUser = { ...updatedUser, ...updateData };
  inMemoryDB.users[userIndex] = updatedUser;
  return User.toResponse(updatedUser);
};

/**
 * deletes user by id, deletes user tasks from Tasks
 * @param id - user id
 * @returns deleted user id
 */
const deleteUser = async (id: string): Promise<string> => {
  if (inMemoryDB.users.findIndex((user: User) => user.id === id) === -1) {
    throw new Error(`User with id ${id} not found`);
  }
  inMemoryDB.users = inMemoryDB.users.filter((user: User) => user.id !== id);

  inMemoryDB.tasks.forEach((task: Task) => {
    const editedTask = task;
    if (task.userId === id) editedTask.userId = null;
  });

  return id;
};

export default { getAll, getUser, createUser, deleteUser, updateUser };
