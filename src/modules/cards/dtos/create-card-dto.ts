import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

//TODO: you are able to adds to someones deck
export const CreateCardSchema = z
  .object({
    front: z.string().min(5),
    back: z.string().min(5),
    deckId: z.string().uuid({ message: 'invalid deckId' }),
    tags: z.array(z.string()).max(5),
  })
  .required();

export class CreateCardDto extends createZodDto(CreateCardSchema) {}
