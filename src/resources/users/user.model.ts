import { v4 as uuidv4 } from 'uuid';

/**
 * User model
 */
export default class User {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * User constructor
   * @param id - id
   * @param name - name
   * @param login - login
   * @param password - password
   */
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return user's id, name and login
   * @param user - full user  data
   * @returns - user data without passwords
   */
  static toResponse(user: Omit<User, 'password'>) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
