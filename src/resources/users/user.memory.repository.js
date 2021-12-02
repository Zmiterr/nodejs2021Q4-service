const inMemoryDB = require('../../inMemoryDB');
const User = require('./user.model');

const getAll = async () => inMemoryDB.users;

const getUser = async (id) => {
  const user = inMemoryDB.users.filter((item) => item.id === id)[0];
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  return User.toResponse(user);
};

const createUser = async (user) => {
  const newUser = new User(user);
  inMemoryDB.users.push(newUser);
  return User.toResponse(newUser);
};

const updateUser = async (id, updateData) => {
  if (inMemoryDB.users.findIndex((item) => item.id === id) === -1) {
    throw new Error(`User with id ${id} not found`);
  }
  const userIndex = inMemoryDB.users.findIndex((item) => item.id === id);
  let updatedUser = inMemoryDB.users[userIndex];
  updatedUser = { ...updatedUser, ...updateData };
  inMemoryDB.users[userIndex] = updatedUser;
  return User.toResponse(updatedUser);
};

const deleteUser = (id) => {
  if (inMemoryDB.users.findIndex((item) => item.id === id) === -1) {
    throw new Error(`User with id ${id} not found`);
  }
  const filteredUsers = inMemoryDB.users.filter((item) => item.id !== id);
  inMemoryDB.users = filteredUsers;

// TODO delete user from tasks

  return id;
};


module.exports = { getAll, getUser, createUser, deleteUser, updateUser };
