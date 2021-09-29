import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Address from 'App/Models/Address';

import AddressService from 'App/Services/AddressService';
import CreateAddressValidator from 'App/Validators/Address/CreateAddressValidator';
import DeleteAddressValidator from 'App/Validators/Address/DeleteAddressValidator';
import FindAddressByIdValidator from 'App/Validators/Address/FindAddressByIdValidator';
import UpdateAddressByIdValidator from 'App/Validators/Address/UpdateAddressByIdValidator';

export default class AddressesController {
  public _addressService = new AddressService();

  public async index({ response }: HttpContextContract) {
    try {
      const allAddresses = this._addressService.index();
      return allAddresses;
    } catch (err) {
      return response.internalServerError({
        message: err.message,
      });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateAddressValidator);
      console.log('passou');
      const body = request.body();
      const addressCreated = this._addressService.create(body as Address);
      return addressCreated;
    } catch (err) {
      return response.internalServerError({
        message: err.message,
      });
    }
  }

  public async findById({ request, response }: HttpContextContract) {
    try {
      await request.validate(FindAddressByIdValidator);
      const id = request.param('id');
      const foundAddres = await this._addressService.findById(id);
      return foundAddres;
    } catch (err) {
      return response.internalServerError({
        message: err.message,
      });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateAddressByIdValidator);
      const id = request.param('id');
      const body = request.body();
      const updatedAddress = await this._addressService.update(
        id,
        body as Address
      );
      return updatedAddress;
    } catch (err) {
      return response.internalServerError({
        message: err.message,
      });
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    try {
      await request.validate(DeleteAddressValidator);
      const id = request.param('id');
      const deletedAddress = await this._addressService.delete(id);
      return deletedAddress;
    } catch (err) {
      return response.internalServerError({
        message: err.message,
      });
    }
  }
}
