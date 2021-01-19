# evently

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

> A monorepo to demonstrate full stack engineering principles


Tech Stack:

1. `client`: React (Typescript)
2. `server`: NodeJS Express (Typescript)


## Prerequisites

**Node**

- Install [`NodeJS`](https://nodejs.org/en/download/). Currently using `v14.15.4 LTS`.
- Run `node -v` in a terminal to verify which version is installed.

**Firebase Tools**
- run `npm i -g firebase-tools`

**VSCode**

[VS Code](https://code.visualstudio.com/) is a preferred editor for this project. *(Optional)*

Helpful extensions:
1. [Typescript](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
2. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
3. [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

## Setup

To install dependencies. This project is managed as a monorepo via `lerna`.
```
npm i
```

## Development

To run development servers
```
npm run dev
```

To focus on a specific package (`server` or `client`), open

## Testing

To run all tests
```
npm run test
```

## Build

To build all packages
```
npm run build
```


## Environments
**Local**
- Client: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:5001/evently-demo/us-central1/api](http://localhost:5001/evently-demo/us-central1/api)


**Development**
- Client: TBD
- API: TBD
  

**Staging**
- Client: TBD
- API: TBD


**Production**
- Client: TBD
- API: TBD

## Other
To reset/clean the environment
```
npm run clean
```

# Contributing


## Git Commit Messages

This repo and build process relies on the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) standard. Below is an example of these for quick reference:

- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `docs`: Documentation only changes
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests