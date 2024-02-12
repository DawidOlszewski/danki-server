import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateDeckSchema = z.object({
  title: z.string().min(5),
});

export class CreateDeckDto extends createZodDto(CreateDeckSchema) {}
