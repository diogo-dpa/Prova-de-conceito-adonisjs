import User from "App/Models/User";

export default class UsersService {
  public async index(){
    const users = await User.all();
    return users;
  }

  public async create(user){
    const newUser = await User.create(user);
    return newUser;
  }
}
