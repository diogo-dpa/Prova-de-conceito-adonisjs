import Address from 'App/Models/Address';
import { v4 as uuid } from 'uuid';

export default class AddressService {
  public async index() {
    try {
      const allAddresses = await Address.query().preload('user_id');
      return allAddresses;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async create(newAddress: Address) {
    try {
      newAddress.id = uuid();
      console.log(newAddress);
      const address = await Address.create(newAddress);
      return address;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async findById(id: string) {
    try {
      const foundAddress = await Address.findByOrFail('id', id);
      return foundAddress;
    } catch (err) {
      throw new Error(err.message || 'Error while searching an address.');
    }
  }

  public async update(id: string, body: Address) {
    try {
      const foundAddress = await Address.findByOrFail('id', id);
      await foundAddress.merge({ ...body }).save();
      return foundAddress;
    } catch (err) {
      throw new Error(err.message || 'Error while updating an address.');
    }
  }

  public async delete(id: string) {
    try {
      const deletedAddres = await Address.findByOrFail('id', id);
      deletedAddres?.delete();
    } catch (err) {
      throw new Error(err.message || 'Error while deleting an address.');
    }
  }
}
