import User from "App/Models/User";
import { v4 as uuid } from 'uuid'

export default class UsersService {
  public async index(){
    const users = await User.all();
    return users;
  }

  public async create(user){
    user.id = uuid();
    const newUser = await User.create(user);
    return newUser;
  }

  public async updateById(id: string, body){
    const foundUser = await User.findByOrFail('id', id);
    foundUser.name = body.name;
    foundUser.email = body.email;
    await foundUser.save();
    return foundUser;
  }

  public async deleteById(id: string){
    const foundUser = await User.findByOrFail('id', id)
    await foundUser.delete();
    return foundUser;
  }
}
