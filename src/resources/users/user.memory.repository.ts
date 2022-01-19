import { getManager, getRepository } from 'typeorm';
import User from './user.model';
import { UserToResponse } from './types';

/**
 * returns all users
 * @returns array of User objects
 */
const getAll = async (): Promise<UserToResponse[]> => getManager().find(User);

/**
 * get user by id
 * @param  id - user id
 * @returns  User object
 */
const getUser = async (id: string): Promise<User | undefined> =>
  getRepository(User).findOne(id);

// {
//   const userById = inMemoryDB.users.filter((user: User) => user.id === id)[0];
//   if (!userById) {
//     throw new Error(`User with id ${id} not found`);
//   }
//   return User.toResponse(userById);
// };

/**
 * creates new user
 * @param user - user data
 * @returns User object
 */
const createUser = async (user: User): Promise<UserToResponse> => {
  const newUser = await getRepository(User).save(user);
  // const newUser = new User(user);
  // inMemoryDB.users.push(newUser);
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
  const userById = await getRepository(User).findOne(id);
  if (!userById) {
    throw new Error(`User with id ${id} not found`);
  }
  const userForUpdate = { ...userById, ...updateData };
  return getRepository(User).save(userForUpdate);
};

/**
 * deletes user by id, deletes user tasks from Tasks
 * @param id - user id
 * @returns deleted user id
 */
const deleteUser = async (id: string): Promise<string> => {
  const userById = await getRepository(User).findOne(id);
  if (!userById) {
    throw new Error(`User with id ${id} not found`);
  }
  await getRepository(User).remove(userById);
  // TODO remove task
  // await getRepository(Task).remove(userById);
  // inMemoryDB.tasks.forEach((task: Task) => {
  //   const editedTask = task;
  //   if (task.userId === id) editedTask.userId = null;
  // });

  return id;
};

export default { getAll, getUser, createUser, deleteUser, updateUser };
