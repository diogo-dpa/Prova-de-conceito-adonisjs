import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import UsersService from 'App/Services/UsersService';
import CreateUserValidator from 'App/Validators/Users/CreateUserValidator';
import DeleteUserValidator from 'App/Validators/Users/DeleteUserValidator';
import FindUserByIdValidator from 'App/Validators/Users/FindUserByIdValidator';
import UpdateUserValidator from 'App/Validators/Users/UpdateUserValidator';

export default class UsersController {
  public _usersService = new UsersService();

  public async index({ response }: HttpContextContract) {
    try {
      const allUsers = this._usersService.index();
      return allUsers;
    } catch (err) {
      return response.internalServerError(err.message);
    }
  }

  public async findUserById({ request, response }: HttpContextContract) {
    try {
      await request.validate(FindUserByIdValidator);
      const id = request.param('id');
      const foundUser = await this._usersService.findUserById(id);
      return foundUser;
    } catch (err) {
      return response.notFound({
        message: err.message,
      });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateUserValidator);
      const body = request.body();
      const userCreated = await this._usersService.create(body as User);
      return userCreated;
    } catch (err) {
      return response.internalServerError({
        message: err.message,
      });
    }
  }

  public async updateById({ request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateUserValidator);
      const id = request.param('id');
      const body = request.body();
      const updatedUser = await this._usersService.updateById(id, body as User);
      return updatedUser;
    } catch (err) {
      return response.internalServerError({
        message: err.message,
      });
    }
  }

  public async deleteById({ request, response }: HttpContextContract) {
    try {
      await request.validate(DeleteUserValidator);
      const id = request.param('id');
      const deletedUser = this._usersService.deleteById(id);
      return deletedUser;
    } catch (err) {
      return response.internalServerError(err.message);
    }
  }
}
