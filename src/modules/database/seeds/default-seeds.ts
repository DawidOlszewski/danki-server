import { Knex } from 'knex';
import { Deck } from 'src/modules/cards/deck.model';
import { User } from 'src/modules/users/user.model';

export async function seed(knex: Knex): Promise<void> {
  await knex('cards').del();
  await knex('decks').del();
  await knex('users').del();

  //TODO: use objection here

  const currentDate = new Date().toISOString();
  const dates = {
    updatedAtString: currentDate,
    createdAtString: currentDate,
  };
  const [user] = await knex('users')
    .insert({ ...dates, email: 'dawid@gmail.com', username: 'DawidO' })
    .returning<User[]>('*');
  const [deck] = await knex('decks')
    .insert({ ...dates, title: 'super wszystko', ownerId: user.id })
    .returning<Deck[]>('*');

  const flashcards = [
    ['welcome', 'witamy'],
    ['in', 'w'],
    ['Poland', 'Polsce'],
    ['co cie tu przyciągneło wariacie', 'hello World'],
  ];

  await knex('cards').insert(
    flashcards.map((card) => ({
      ...dates,
      deckId: deck.id,
      front: card[0],
      back: card[1],
      tags: [],
    })),
  );

  console.log(user, deck, flashcards);
}
