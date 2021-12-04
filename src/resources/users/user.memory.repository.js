const inMemoryDB = require('../../inMemoryDB');
const User = require('./user.model');

const getAll = async () => inMemoryDB.users;

const getUser = async (id) => {
  const userById = inMemoryDB.users.filter((user) => user.id === id)[0];
  if (!userById) {
    throw new Error(`User with id ${id} not found`);
  }
  return User.toResponse(userById);
};

const createUser = async (user) => {
  const newUser = new User(user);
  inMemoryDB.users.push(newUser);
  return User.toResponse(newUser);
};

const updateUser = async (id, updateData) => {
  if (inMemoryDB.users.findIndex((user) => user.id === id) === -1) {
    throw new Error(`User with id ${id} not found`);
  }
  const userIndex = inMemoryDB.users.findIndex((user) => user.id === id);
  let updatedUser = inMemoryDB.users[userIndex];
  updatedUser = { ...updatedUser, ...updateData };
  inMemoryDB.users[userIndex] = updatedUser;
  return User.toResponse(updatedUser);
};

const deleteUser = async (id) => {
  if (inMemoryDB.users.findIndex((user) => user.id === id) === -1) {
    throw new Error(`User with id ${id} not found`);
  }
  inMemoryDB.users = inMemoryDB.users.filter((user) => user.id !== id);

  inMemoryDB.tasks.forEach((task) => {
    const editedTask = task;
    if (task.userId === id) editedTask.userId = null;
  });

  return id;
};

module.exports = { getAll, getUser, createUser, deleteUser, updateUser };
