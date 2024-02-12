import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const FindUsersDecksSchema = z.object({
  ownerId: z.string(),
  //TODO .uuid()
});

export class FindUsersDecksDto extends createZodDto(FindUsersDecksSchema) {}
