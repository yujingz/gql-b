import { Router } from "express";
import faker from "faker";
import _ from "lodash";

const TEST_KEY = "test-key";

const bookings = _.map(_.times(5), index => {
  return {
    id: index,
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    checkIn: faker.date.past(),
    checkOut: faker.date.future(),
    stayLength: faker.random.number(10) + 1
  };
});

const tokenRequired = (req, res) => {
  const token = req.headers.authorization;
  if (!token || token !== TEST_KEY) {
    return res.status(403).json("Unauthorized");
  }
};

const routes = Router();

routes.get("/", (req, res) => {
  return res.json("Hello World");
});

routes.get("/users/:user_id", (req, res) => {
  tokenRequired();

  return res.json({
    name: faker.name.findName(),
    streetAddress: faker.address.streetAddress(),
    email: faker.internet.email(),
  });
});

routes.post("/sessions", (req, res) => {
  return res.json({
    token: TEST_KEY,
    id: "user-id"
  });
});

routes.get("/bookings", (req, res) => {
  tokenRequired(req, res);
  return res.json(bookings);
});

export default routes;
