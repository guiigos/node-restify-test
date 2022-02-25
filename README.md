# Node Restify Test
Project designed to practice unit and integration tests with **NodeJs** performing the creation of the server with [restify](http://restify.com/) and [mongoose](https://mongoosejs.com/). The tests are being carried out with [mocha](https://mochajs.org/) and [chai](https://www.chaijs.com/), performing the simulation of artifacts with the [sinon](https://sinonjs.org/), using [nyc](https://istanbul.js.org/) to report code coverage. This project has a basic structure of a rest route.

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

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
