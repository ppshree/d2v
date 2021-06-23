# Introduction

This project is bootstrapped with Create React App Typescript, using the Redux and Redux Toolkit template.
I have mentioned all the necessary steps below to run this project. So make sure to follow all the steps properly.

## Branch Info

- Currently there are `3` major branch `(master, development, stagging)`.
- For working purpose you can create your own individual branch like this naming format `code/<anyname>` and `push` it to the repo with a `pull request` to the development branch.
- `Note: Make sure always pull request to development branch without any conflict.`
- `master` and `stagging` branch should be use for `production` purpose only.

## Getting started

### Follow these steps:

1. Make sure `node.js and npm` already installed in your system properly.
2. Clone this repo into your local machine using `git clone https://github.com/Your-Skool-Your-Way/Platform-fe.git`.
3. For `new developer:` switch from `master` branch to `development` branch `($:git checkout development)`.

   - Run `npm install` to install the required `node-modules` for this project.
   - `npm uninstall tailwindcss npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`

## Folder Structure

As mentioned above our project is Bootstrapped with `Creact react app, typescript and Redux toolkit` so the major folder structure is:

    .
    +-- node-modules
    +-- public
    +-- src
    +-- .gitignore
    +-- package-lock.json
    +-- package.json
    +-- tsconfig.json
    +-- Readme.md

For better coding experience our project is integrated with `eslint` and `prettier` module. For eslint you must have `eslint extension` setup in your working editor. So for working of these two modules (`eslint and prettier`) we have two config files in our folder structure which contains all the necessary configuration for our project.

    .
    +-- .....
    +-- .eslintrc
    +-- .prettierrc
    +-- ......

The backend `API` URL of our project for different `environments` e.g `Development, Stagging, Production`, we have setup `3` `.env` files in our folder structure respectively.

    .
    +-- .....
    +-- .env
    +-- .env.stagging
    +-- .env.production
    +-- ......

Till now our folder structure is.

    .
    +-- node-modules
    +-- public
    +-- src
    +-- .env
    +-- .env.stagging
    +-- .env.production
    +-- .eslintrc
    +-- .eslintcache
    +-- .prettierrc
    +-- .gitignore
    +-- package-lock.json
    +-- package.json
    +-- tsconfig.json
    +-- Readme.md

Lets step forward into our main web app project structure inside `src` folder. Inside this we have major `4` folders.

    .
    +-- node-modules
    +-- public
    +-- src
    |   +-- app
    |   +-- components
    |   +-- pages
    |   +-- types
    |   +-- ......
    +-- ......

Inside `app` folder we have setup `api, entity, helpers, hoc, router, service, util`.

    .
    +-- .....
    +-- src
    |   +-- app
        |   +-- api
            |   +-- [all API files extends from base api ]
            |   +-- base.api.ts
        |   +-- entity
            |   +-- config.ts (different env variables )
            |   +-- constant.ts (different const values )
            |   +-- firebase.ts (firebase config setup)
            |   +-- reqParam.ts (api req params interface)
        |   +-- helpers
            |   +-- [content CRUD helper function]
            |   +-- [user CRUD helper function]
            |   +-- [authentication header setup]
            |   +-- [user list search hook]
            |   +-- [firebase storage hook]
        |   +-- router
            |   +-- config.ts (each routing path)
            |   +-- Router.ts (route path must inside a Route)
        |   +-- service
            |   +-- [all services named according to API]
        |   +-- util
            |   +-- [theme utility]
        |   +-- rootReducer.ts
        |   +-- store.ts
    |   +-- ......
    +-- ......

Inside `components` we have setup our required components as our need with `CamelCase` naming format.

    .
    +-- ......
    +-- src
    |   +-- ......
    |   +-- components
        |   +-- [ComponentName]
            |   +-- [ComponentName].tsx
    |   +-- ......
    +-- ......

Inside `pages` we have setup our each route page with its `3` sub files using `CamelCase` naming format. Each page consists of its `css` file and corresponding `slice` file accroding `Redux Toolkit`.

    .
    +-- ......
    +-- src
    |   +-- ......
    |   +-- pages
        |   +-- [PageName]
            |   +-- [PageName].tsx
            |   +-- [PageName].css
            |   +-- [PageNameSlice].ts
    |   +-- ......
    +-- ......

## Development Scripts

### `npm start:dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build:dev`

Builds the app for development purpose to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Production Scripts

### `npm start:prod`

Runs the app in the production mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build:prod`

Builds the app for production purpose to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
