const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const server = require("../server");

describe("/GET cars", () => {
  it("it should GET all the cars", (done) => {
    chai
      .request(server)
      .get("/api/cars")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body[0]).to.be.a("object");
        expect(res.body[0]).to.have.property("company");
        done();
      });
  });
});


describe("/POST car", () => {
  it("it should POST a car and return statuscode 200", (done) => {
    chai
      .request(server)
      .post("/api/cars")
      .send({ company: "Maruthi", model: "Zen" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.a.property("id");
        done();
      });
  });
  it("it should return status code 400", (done) => {
    chai
      .request(server)
      .post("/api/cars")
      .send({ company: "Maruthi", model: "" })
      .end((err, res) => {
        console.log(res);
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});


describe("/UPDATE cars", () => {
  it("it should Update the car and return status code 200", (done) => {
    chai
      .request(server)
      .put("/api/cars/2")
      .send({ company: "Maruthi", model: "swift" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.equal(1);
        done();
      });
  });
  it("it should return 400 statuscode", (done) => {
    chai
      .request(server)
      .put("/api/cars/2")
      .send({ company: "", model: "" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});
