import { Deck } from './deck.model';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { UUID } from '../../types/uuid.type';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
//@ts-expect-error
import AnkiExport from 'anki-apkg-export';
import { writeFile } from 'fs/promises';
import { readFileSync } from 'fs';

@Injectable()
export class DecksService {
  constructor(@Inject(Deck) private decksModel: typeof Deck) {}

  findDeck(id: UUID) {
    return this.decksModel.query().findById(id);
  }

  async createDeck(createDeckDto: CreateDeckDto, ownerId: UUID) {
    return this.decksModel.query().insert({ ...createDeckDto, ownerId });
  }

  async createApkg(deckId: string) {
    const deck = await this.decksModel
      .query()
      .findById(deckId)
      .withGraphFetched({ cards: true });
    if (!deck || !deck.cards) {
      throw new NotFoundException();
    }
    const apkg = new AnkiExport(deck?.title);
    deck.cards.map((card) => {
      apkg.addCard(card.front, card.back, { tags: card.tags });
    });
    // const file = readFileSync('pixel.jpg');
    // apkg.addMedia('pixel.jpg', file);
    // apkg.addCard('card #3 with image <img src="pixel.jpg">', 'uuo');
    const zip = await apkg.save();
    console.log(zip);
    // await writeFile('output.apkg', zip);
    // writeFile('name.txt', 'hello world', (err) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('File saved!');
    //   }
    // });
  }

  async getAllDecks() {
    return this.decksModel.query();
  }

  //   const fs = require('fs');
  // const AnkiExport = require('anki-apkg-export').default;

  // const apkg = new AnkiExport('deck-name');

  // apkg.addMedia('anki.png', fs.readFileSync('anki.png'));

  // apkg.addCard('card #1 front', 'card #1 back');
  // apkg.addCard('card #2 front', 'card #2 back', { tags: ['nice', 'better card'] });
  // apkg.addCard('card #3 with image <img src="anki.png" />', 'card #3 back');

  // apkg
  //   .save()
  //   .then(zip => {
  //     fs.writeFileSync('./output.apkg', zip, 'binary');
  //     console.log(`Package has been generated: output.pkg`);
  //   })
  //   .catch(err => console.log(err.stack || err));
}
