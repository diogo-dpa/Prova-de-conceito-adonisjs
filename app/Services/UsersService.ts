import User from 'App/Models/User';
import { v4 as uuid } from 'uuid';

export default class UsersService {
  public async index() {
    try {
      const users = await User.all();
      return users;
    } catch (err) {
      throw new Error(err.message || 'Error while finding an user.');
    }
  }

  public async findUserById(id: string) {
    try {
      const foundUser = await User.findByOrFail('id', id);
      return foundUser;
    } catch (err) {
      throw new Error(err.message || 'User not found');
    }
  }

  public async create(user: User) {
    try {
      user.id = uuid();
      const newUser = await User.create(user);
      return newUser;
    } catch (err) {
      throw new Error(err.message || 'Error while creating an user.');
    }
  }

  public async updateById(id: string, body: User) {
    try {
      const foundUser = await User.findByOrFail('id', id);
      await foundUser.merge({ ...body }).save();
      return foundUser;
    } catch (err) {
      throw new Error(err.message || 'User Id does not exist.');
    }
  }

  public async deleteById(id: string) {
    try {
      const foundUser = await User.findByOrFail('id', id);
      await foundUser.delete();
      return foundUser;
    } catch (err) {
      throw new Error(err.message || 'User Id does not exist.');
    }
  }
}
