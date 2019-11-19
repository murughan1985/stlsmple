const StellarSdk = require("stellar-sdk");
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
const fetch = require("node-fetch");

async function createStellarAccount() {
  const pair = StellarSdk.Keypair.random();
  await fetch(
    `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`
  );
  return {
    publicKey: pair.publicKey(),
    secretKey: pair.secret()
  };
}

async function getAccountBalance(accountId) {
  const result = await server
    .accounts()
    .accountId(accountId)
    .call();
  const balance = result.balances[0].balance;
  return {
    XLM: balance
  };
}

async function transferXLM(receiverId, senderSecret, amount) {
  await server.loadAccount(receiverId);
  const senderAccountKeypair = StellarSdk.Keypair.fromSecret(senderSecret);
  const sourceAccount = await server.loadAccount(
    senderAccountKeypair.publicKey()
  );
  const fee = await server.fetchBaseFee();
  const asset = StellarSdk.Asset.native();
  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee,
    networkPassphrase: StellarSdk.Networks.TESTNET
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: receiverId,
        asset,
        amount
      })
    )
    .setTimeout(30)
    .build();
  transaction.sign(senderAccountKeypair);
  return server.submitTransaction(transaction);
}

async function streamForAccount(accountId) {
  return server
    .payments()
    .forAccount(accountId)
    .cursor("now")
    .stream({
      onmessage: PaymentResponse => {
        console.log(
          `Account Id: ${accountId}\nis created with ${PaymentResponse.amount} XLM\nfrom Account: ${PaymentResponse.from}\n`
        );
      }
    });
}

module.exports = {
  createStellarAccount,
  getAccountBalance,
  transferXLM,
  streamForAccount
};
