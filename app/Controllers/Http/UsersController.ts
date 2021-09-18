import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersService from 'App/Services/UsersService';
import CreateUserValidator from 'App/Validators/CreateUserValidator';

export default class UsersController {

  public _usersService = new UsersService();

  public async index(){
    const allUsers = this._usersService.index();
    return allUsers;
  }

  public async create({request}: HttpContextContract){
    await request.validate(CreateUserValidator);
    const body = request.body();
    const userCreated = await this._usersService.create(body);
    return userCreated;
  }
}
