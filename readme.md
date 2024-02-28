# Danki server

Danki is a simple application created in order to facilitate usage of anki with external dictionares like diki.
Project was written in typescript/nestjs/knexjs stack

Technologies, that were used:
- GOOGLE OAUTH
- Objectionjs
- Multer
- Zod
- Swagger open-api
- anki-apkg-export library
- Docker compose

## How to use it

1. in project directory execute `docker-compose up -d`
2. by default application will be accessible on `localhost:3000`. You can utilize swagger changing url to `/api`
3. go to backend container's terminal and execute `npm run migrate:latest`

**GOOD LUCK**