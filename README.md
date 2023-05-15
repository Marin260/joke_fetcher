# Joke fetcher

A small Node.JS applications that fetches and sends jokes to the authenticated user, developed with REST architecture in mind

## Setup

After cloning the repo run the following comand to install all the dependencies:

```shell
npm install
```

Create a `.env` file and populate like shown in the `.env.example`

A postgres database is used. Start the migration-runner before running the app to create the tables needed for the app.

```shell
npm run migrate
```

to run server in development mode for hot reload:

```shell
npm run start:dev
```

to build the app and run it:

```shell
npm run start
```

The server should now be running...

A postman collection will is provided with the project to test the app.
