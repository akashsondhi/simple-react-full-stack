// Import the dependencies for testing
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Testing API Server", () => {
  describe("GET /api/findPrimeMedian", () => {
    // Test to make API call without passing primeLimit parameter
    describe("should throw 400", () => {
        it("when primeLimit parameter isn't passed", done => {
            chai
              .request(app)
              .get("/api/findPrimeMedian")
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("error")
                  .eql("Missing Prime Number Limit");
                res.body.should.not.have.property("median");
                done();
              });
          });
          // Testing to make API call with a non-integer primeLimit parameter
          it("when non-integer primeLimit parameter is passed", done => {
            chai
              .request(app)
              .get("/api/findPrimeMedian?primeLimit=abc")
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("error")
                  .eql("Prime Number Limit must be integer");
                res.body.should.not.have.property("median");
                done();
              });
          });
          it("when primeLimit parameter < 2 is passed", done => {
            chai
              .request(app)
              .get("/api/findPrimeMedian?primeLimit=1")
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("error")
                  .eql("Prime Number Limit must be greater than 1");
                res.body.should.not.have.property("median");
                done();
              });
          });
          it("when negative primeLimit parameter is passed", done => {
              chai
                .request(app)
                .get("/api/findPrimeMedian?primeLimit=-5")
                .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a("object");
                  res.body.should.have
                    .property("error")
                    .eql("Prime Number Limit must be greater than 1");
                  res.body.should.not.have.property("median");
                  done();
                });
            });
    });
    describe("should send 200 status", () => {
        it("for valid primeLimit that has even primes", done => {
            chai
              .request(app)
              .get("/api/findPrimeMedian?primeLimit=10")
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.not.have.property("error");
                res.body.should.have.property("median").eql("[3,5]");
                done();
              });
          });
          it("for valid primeLimit that has odd primes", done => {
            chai
              .request(app)
              .get("/api/findPrimeMedian?primeLimit=18")
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.not.have.property("error");
                res.body.should.have.property("median").eql("[7]");
                done();
              });
          });
    })
    
  });
});
