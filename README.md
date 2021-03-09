# ngx-social-auth

The project contains Angular library [ngx-social-auth2](https://www.npmjs.com/package/ngx-social-auth2) that provides opportunity to authenticate users by using social identity providers.

[![CircleCI](https://img.shields.io/circleci/build/github/dmytro-parfenov/ngx-social-auth)](https://app.circleci.com/pipelines/github/dmytro-parfenov/ngx-social-auth?branch=master)

## Supported providers

- [Google](https://developers.google.com/identity/sign-in/web/reference)
- [Facebook](https://developers.facebook.com/docs/javascript)
- [Microsoft](https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/)

# Getting Started

## Structure

Repository contains two projects

- [ngx-social-auth](https://github.com/dmytro-parfenov/ngx-social-auth/tree/master/projects/ngx-social-auth) - library source code
- [ngx-social-auth-demo](https://github.com/dmytro-parfenov/ngx-social-auth/tree/master/projects/ngx-social-auth-demo) - used for testing the library and provides demo application


## Development

Run `npm run start:lib` for a build library. The library will automatically rebuild if you change any of the source files from [ngx-social-auth](https://github.com/dmytro-parfenov/ngx-social-auth/tree/master/projects/ngx-social-auth).

Run `npm run start:demo` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files from [ngx-social-auth-demo](https://github.com/dmytro-parfenov/ngx-social-auth/tree/master/projects/ngx-social-auth-demo).

It is necessary to run `npm run start:lib` before `npm run start:demo` to ensure that library has already built before the demo application will run.

## Running unit tests

Run `npm run test:lib` to execute the unit tests via [Karma](https://karma-runner.github.io) for the library.

Run `npm run test:demo` to execute the unit tests via [Karma](https://karma-runner.github.io) for the demo application.

## Build

Run `npm run build:lib:prod` to make a production build of the library. The build artifacts will be stored in the `dist/ngx-social-auth2` directory.

Run `npm run build:demo:prod` to make a production build of the demo application. The build artifacts will be stored in the `dist/ngx-social-auth-demo` directory.

## Documentation

Run `npm run docs:lib` to build the documentation for the library. The build artifacts will be stored in the `docs` directory.

## Contributing

[Contributing guideline](https://github.com/dmytro-parfenov/ngx-social-auth/blob/master/CONTRIBUTING.md)

## Further help

To get more help mail to [dmitryparfenov937@gmail.com](mailto:dmitryparfenov937@gmail.com?subject=[GitHub]%20ngx-social-auth)
