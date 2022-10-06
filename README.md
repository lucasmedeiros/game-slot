# Game Slot

## About the project

With Game Slot, you can review games you've played, read other people opinions, create custom lists with the games you want and build a lovely community of gamers!

> Currently, GameSlot only has access to games that are registered on Steam.

### Game lists

When you log in, you can create your own lists of games you've played that exists on **Steam**. At any moment, you can add games to your lists, and edit them the way you want!

![home page](https://i.imgur.com/wBcUTtx.png)

### Adding games to your lists

To add a game to a list, you can search the game by using the **search bar** on the top menu and clicking on _Add to list..._ button on the game page. This will open a modal for selecting the list.

![game page](https://i.imgur.com/x5yrViD.png)

### Review games

You can also share to the world your feelings about a game. In the game page, there's a **review section**, where you can create and edit your review at any time!

![game review](https://i.imgur.com/eWDd5Co.png)

## Running in development mode

Loved Game Slot and want to contribute for it? Nice! For running in development mode, you can follow the steps below.

> To run both **backend** and **frontend**, you'll need to have both `node` and `yarn` installed in your local development machine. I highly recommend you to install node with [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating), and yarn by its [official website](https://yarnpkg.com/).

First of all, you'll need to clone and install the dependencies of this repository with the commands:

```zsh
git clone https://github.com/lucasmedeiros/game-slot.git
cd game-slot
yarn
yarn bootstrap
```

### Backend configuration

This is a NodeJS / Express project and also makes calls to **Steam Store API**, only for getting game details. To know more about the Steam Store API, you can start by [here](https://stackoverflow.com/q/41318655/11125096) (there isn't official documentation for it).

The database chosen for this project was **[MongoDB](https://www.mongodb.com/)** and the authentication model chosen was **[JSON Web Tokens](https://jwt.io/)**. So, you'll need to define two **environment variables** on `.env` file, that should be located on this project's root folder, following the [backend .env.example file](./game-slot/backend/.env.example):

```env
# MongoDB URI
MONGODB_URI=

# Secret for JWT authentication
JWT_SECRET=
```

The `MONGODB_URI` variable should follow this [format](https://docs.mongodb.com/manual/reference/connection-string/). And the `JWT_SECRET` may be any string, since it's private.

Then, run with the command:

```zsh
yarn start:backend # in development mode
yarn serve:backend # in production
```

### Frontend configuration

This is a [Create React App](https://create-react-app.dev/) project, so make sure you have **Node 10.16.0 or later** version installed on your local development machine system. Again, I highly recommend to use **nvm**.

You'll need to define the API URL in the .env following the [frontend .env.example file](./game-slot/frontend/.env.example):

```env
REACT_APP_API_URL=
```

Then, run with the command:

```zsh
yarn start:frontend # in development mode
yarn serve:frontend # build
```

## Testing

To run all frontend tests, use:

```zsh
yarn test:frontend
```
