# Game Slot

With Game Slot, you can review games you've played on Steam, read other people opinions, create a personal wishlist with the games you're willing to play and build a lovely community of game lovers!

## How it works?

Work in progress...

## About the project

Game Slot is a [Create React App](https://create-react-app.dev/) project, and uses a [own API](https://github.com/lucasmedeiros/game-slot-api) (its documentation is a WIP) and also makes calls to **Steam Store API**, only for getting game details. To read more about it, you can start by [here](https://stackoverflow.com/q/41318655/11125096) (there isn't official documentation for it).

## Running in development mode

First of all, you'll need to clone [Game Slot API](https://github.com/lucasmedeiros/game-slot-api), and then locally run it by following its README instructions.

This is a React (CRA) project, so you should have **Node 10.16.0 or later** version installed on your local development machine system. You can use [nvm](https://github.com/nvm-sh/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

You should also have `yarn` (or `npm` if you prefer) CLI. To install them, you can follow the links below:

- [Install yarn](https://classic.yarnpkg.com/en/docs/install)
- [Install npm](https://www.npmjs.com/get-npm)

Then, you should be able to run this project. Clone it and install its dependencies by entering:

```zsh
git clone https://github.com/lucasmedeiros/game-slot.git
cd game-slot
yarn # or npm install
```

Finally, you'll be able to start the **local server in development mode** on port 3000 by running:

```zsh
yarn start # or npm start
```

To create a **simple production build**, you can run:

```zsh
yarn build # or npm run build
```
