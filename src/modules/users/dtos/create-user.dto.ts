import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    username: z.string().min(5),
    email: z.string().email(),
  })
  .required();

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
