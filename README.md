# Node Restify Test
Project designed to practice unit and integration tests with **NodeJs** performing the creation of the server with [restify](https://github.com/restify/node-restify) and [mongoose](https://github.com/automattic/mongoose). The tests are being carried out with [mocha](https://github.com/mochajs/mocha) and [chai](https://github.com/chaijs/chai), performing the simulation of artifacts with the [sinon](https://github.com/sinonjs/sinon), using [istanbul](https://github.com/istanbuljs/nyc) to report code coverage. This project has a basic structure of a rest route.

![NYC Config](https://img.shields.io/nycrc/guiigos/node-restify-test?config=.nycrc.json)
[![Coverage Status](https://coveralls.io/repos/github/guiigos/node-restify-test/badge.svg)](https://coveralls.io/github/guiigos/node-restify-test)

<details>
  <summary>
    <strong>:pushpin: Menu</strong>
  </summary>
  <br>
  
> - [_**Usage**_](#usage)
>   - [_Dependencies_](#dependencies)
>   - [_Scripts_](#scripts)
> - [_**License**_](#license)
  
</details>

## Usage
### Dependencies
Install dependencies and modules.

```bash
$ npm install
```

### Scripts
After installing the dependencies the application is ready to run.

```bash
# Start
$ npm start
$ npm run nodemon
```

```bash
# Test
$ npm run mocha
$ npm run nyc
```

## License
Project developed for academic purposes.

[![License: MIT](https://img.shields.io/github/license/guiigos/node-restify-test)](./LICENSE)
