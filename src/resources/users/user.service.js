const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUserByID = id => usersRepo.getUser(id);

const createUser = user => usersRepo.createUser(user);

const deleteUserByID = id => usersRepo.deleteUser(id);

const updateUserByID = (id, updateData) => usersRepo.updateUser(id, updateData);

module.exports = { getAll, getUserByID, createUser, deleteUserByID, updateUserByID  };
