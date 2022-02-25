const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiThings = require('chai-things');

chai.use(chaiHttp);
chai.use(chaiThings);

global.expect = chai.expect;
global.assert = chai.assert;
global.request = chai.request;
