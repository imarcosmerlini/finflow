## Project requirements 

- Node v22.6.0

## Routes
There is a file called api.http with usage examples 

## Project setup

It necessary to create a .env file in the root of the project:

``` bash
DATABASE_URL="file:./dev.db"
SECRET="CHAVESECRETAPARATESTESJWT"
API_VALIDATION="https://66ad1f3cb18f3614e3b478f5.mockapi.io/v1/auth"
API_NOTIFICATION="https://66ad1f3cb18f3614e3b478f5.mockapi.io/v1/send"
```
Then you can follow this commands

```bash
$ npm install
$ npx prisma generate
$ npx prisma db push
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
