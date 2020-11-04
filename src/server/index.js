const express = require("express");
// const bodyParser = require('body-parser');
const UTIL = require("./util");
const app = express();

app.use(express.static("dist"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get("/api/findPrimeMedian", (req, res) => {
  if (req.query.primeLimit == null || req.query.primeLimit == "") {
    res
      .status(400)
      .send({ error: "Missing Prime Number Limit", param: "primeLimit" });
  } else if (!Number.isInteger(parseInt(req.query.primeLimit))) {
    res
      .status(400)
      .send({
        error: "Prime Number Limit must be integer",
        param: "primeLimit"
      });
  } else if (req.query.primeLimit < 2) {
    res
      .status(400)
      .send({
        error: "Prime Number Limit must be greater than 1",
        param: "primeLimit"
      });
  } else {
    res
      .status(200)
      .send({ median: UTIL.primeMedianFinder(req.query.primeLimit) });
  }
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);

module.exports = app;
