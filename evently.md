# Evently

## Setup

```
npm init -y

git init

touch .gitignore
git add .
git commit -m 'Initial commit'

touch readme.md

npx lerna init

mkdir packages/evently-client
mkdir packages/evently-server

cd packages/evently-client
npm init

cd packages/evently-server
npm init

```

## evently-server

### build system setup

Install dependencies (babel, typescript, webpack, jest)
```
npm install --save-dev typescript @babel/core @babel/cli @babel/node @babel/plugin-proposal-class-properties @babel/@babel/plugin-proposal-object-rest-spread @babel/preset-env @babel/preset-typescript babel-watch jest @types/jest concurrently
```

Create your `tsconfig.json`
```
tsc --init --declaration --allowSyntheticDefaultImports --target esnext --outDir lib
```

Create your `.babelrc`
```
{
    "presets": [
      "@babel/preset-env",
      "@babel/preset-typescript"
    ],
    "plugins": [
      "@babel/plugin-proposal-class-properties"
    ]
}
```

Set up your build tasks (in `package.json`)
```
"scripts": {
    "clean": "rm -fr dist",
    "test": "jest",
    "test:watch": "jest --watch",
    "dev": "concurrently --names \"TSC,BABEL\" -c \"blue.bold,green.bold\" \"npm run tsc:w\" \"npm run serve\"",
    "serve": "babel-watch src/index.ts --extensions \".ts\" --source-maps inline",
    "tsc": "tsc --noEmit",
    "tsc:w": "npm run tsc -- --watch",
    "build": "npm run clean && npm run build:types && npm run build:js",
    "build:types": "tsc --emitDeclarationOnly",
    "build:js": "babel src -d dist --extensions \".ts,.tsx\""
}
```

Create source files
```
touch src/index.ts
```

### Express App

Install dependencies

```
npm i express
npm i -D @types/node @types/express
```

Setup config
```
npm i config
npm i -D @types/config
```