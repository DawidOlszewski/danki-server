import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable('users', (tb) => {
    tb.uuid('id', { primaryKey: true }).defaultTo(
      knex.raw('uuid_generate_v4()'),
    );
    tb.string('email', 100).notNullable();
    tb.string('username', 100).notNullable();
    tb.timestamp('updatedAtString').notNullable();
    tb.timestamp('createdAtString').notNullable();
  });

  await knex.schema.createTable('decks', (tb) => {
    tb.uuid('id', { primaryKey: true }).defaultTo(
      knex.raw('uuid_generate_v4()'),
    );
    tb.uuid('ownerId').references('id').inTable('users');
    tb.string('title', 100).notNullable();
    tb.timestamp('updatedAtString').notNullable();
    tb.timestamp('createdAtString').notNullable();
  });

  await knex.schema.createTable('cards', (tb) => {
    tb.uuid('id', { primaryKey: true }).defaultTo(
      knex.raw('uuid_generate_v4()'),
    );
    tb.uuid('deckId').references('id').inTable('decks');
    tb.string('front', 100).notNullable();
    tb.string('back', 100).notNullable();
    tb.string('tags', 100).notNullable();
    tb.timestamp('updatedAtString').notNullable();
    tb.timestamp('createdAtString').notNullable();
  });

  await knex.schema.createTable('identities', (tb) => {
    tb.string('provider').notNullable();
    tb.string('providerId');
    tb.uuid('userId').references('id').inTable('users');

    tb.unique(['provider', 'providerId'], {
      indexName: 'providerIndex',
      useConstraint: true,
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('cards');
  await knex.schema.dropTableIfExists('decks');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('identities');

  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}
