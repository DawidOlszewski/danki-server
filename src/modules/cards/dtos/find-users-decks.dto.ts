import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const FindUsersDecksSchema = z.object({
  ownerId: z.string(),
  //TODO .uuid()
});

export class FindUsersDecksDtO extends createZodDto(FindUsersDecksSchema) {}
export type FindUsersDecksDto = Required<FindUsersDecksDtO>;
