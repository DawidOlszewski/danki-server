import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateCardSchema = z
  .object({
    front: z.string().min(5),
    back: z.string().min(5),
    deckId: z.string(),
    // .uuid({ message: 'invalid deckId' })
    tags: z.array(z.string()).max(5),
  })
  .required();

export class CreateCardDtO extends createZodDto(CreateCardSchema) {}
export type CreateCardDto = Required<CreateCardDtO>;
