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
}
