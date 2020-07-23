
const app = require('../src/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect} = chai;


chai.use(chaiHttp);

describe('Test an API call!', () => {
  it('Get all Product API', (done) => {
    chai
        .request(app)
        .get('/ec/products')
        .end((err, res) => {
          expect(res).to.have.status(200);
          // expect(res.body.status).to.equals("success");
          // expect(res.body.message).to.equals("Welcome To Testing API");
          done();
        });
  });
});
