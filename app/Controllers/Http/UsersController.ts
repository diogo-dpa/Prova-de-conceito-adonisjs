import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersService from 'App/Services/UsersService';
import CreateUserValidator from 'App/Validators/Users/CreateUserValidator';
import UpdateUserValidator from 'App/Validators/Users/UpdateUserValidator';

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

  public async updateById({request}: HttpContextContract){
    await request.validate(UpdateUserValidator);
    const id = request.param('id');
    const body = request.body();
    const updatedUser = await this._usersService.updateById(id, body);
    return updatedUser;
  }

  public async deleteById({request}: HttpContextContract){
    const id = request.param('id');
    const deletedUser = this._usersService.deleteById(id);
    return deletedUser;
  }
}
