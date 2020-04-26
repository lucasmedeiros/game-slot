# Game Slot API

Game Slot official API!

## Documentation

Work in progress...

## About the project

This is a NodeJS / Express project. To run, you'll need to have both install `node` and `npm` in your local development machine system. You can follow [this tutorial](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Running in development mode

Clone the project and install its dependencies by entering:

```zsh
git clone https://github.com/lucasmedeiros/game-slot-api.git
cd game-slot-api
npm install
```

Then, you'll need to define two **environment variables** on `.env` file, that should me located on this project's root folder, following `.env.example` file:

```env
# MongoDB URI
MONGODB_URI=

# Secret for JWT authentication
JWT_SECRET=
```

The `MONGODB_URI` variable should follow this [format](https://docs.mongodb.com/manual/reference/connection-string/). And the `JWT_SECRET` may be any string, since it's private.

Finally, you'll be able to start the **local server in development mode** by running:

```zsh
npm run dev
```

To run in production mode, enter:

```zsh
npm start
```
