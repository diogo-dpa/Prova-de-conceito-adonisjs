import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Addresses extends BaseSchema {
  protected tableName = 'addresses';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();

      table.string('street').notNullable();

      table.string('neighborhood').notNullable();

      table.string('state').notNullable();

      table.string('country').notNullable();

      table.string('complement').nullable();

      table.string('zip_code').notNullable();

      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
