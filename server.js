const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const stellarService = require("./services/stellarService");

const accountAddresses = require('./exchange/addressList');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

stellarService.streamPayments(accountAddresses);

app.get("/createAccount", async (req, res, next) => {
  let account;
  try {
    account = await stellarService.createStellarAccount();
  } catch (error) {
    return next(error);
  }
  res.send({ account });
});

app.get("/balance", async (req, res, next) => {
  const { accountId } = req.query;
  let balance;
  try {
    balance = await stellarService.getAccountBalance(accountId);
  } catch (error) {
    return next(error);
  }
  res.send({ balance });
});

app.post("/transfer", async (req, res, next) => {
  const { receiverId, senderSecret, amount } = req.body;
  try {
    await stellarService.transferXLM(receiverId, senderSecret, amount);
  } catch (error) {
    return next(error);
  }
  res.sendStatus(204);
});

app.get("/pastTransaction", async (req, res, next) => {
  let payments;
  try {
    payments = await stellarService.fetchTransactionForAccount(req.query.accountId);
  } catch (error) {
    return next(error);
  }
  res.send(payments);
});

app.post("/listen", async (req, res, next) => {
  const { accountId } = req.body;
  try {
    await stellarService.streamForAccount(accountId);
  } catch (error) {
    return next(error);
  }
  return res.sendStatus(204);
});

app.use((err, req, res, next) => {
  console.log("err: ", err);
  res.status(err.status || 500);
  res.send({ err });
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});
