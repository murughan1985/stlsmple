var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// server.accounts()
//   .accountId("GDDZS2GFURC7HCGUV3YQV3SNJ2K7YDF5RTZAIXNGMSQ2U2E44LATMNXV")
//   .call()
//   .then(function (accountResult) {
//     console.log(accountResult.balances[0].balance);
//   })
//   .catch(function (err) {
//     console.error(err);
//   })

  //public key
//GDDZS2GFURC7HCGUV3YQV3SNJ2K7YDF5RTZAIXNGMSQ2U2E44LATMNXV
//secret
//SCTND72NJ6BUR6PFNAES67V46YIAEVNW76JB6L2X7UXQOKENGN3EWCJP


//public key
//GANK53M6NMGAP44PPUSUCT75ALOOATJ2BD5NIAB3UQXHVK7C4SE4WZV7
//secret
//SBIIJHZOZWZM5RC3IRIEBB5YX6UYODYY3NFJGEX5SHY7L753WXUBNW2C

(async function main() {
    try {
// the JS SDK uses promises for most actions, such as retrieving an account
const account = await server.loadAccount('GDDZS2GFURC7HCGUV3YQV3SNJ2K7YDF5RTZAIXNGMSQ2U2E44LATMNXV');
console.log("Balances for account: GDDZS2GFURC7HCGUV3YQV3SNJ2K7YDF5RTZAIXNGMSQ2U2E44LATMNXV");
account.balances.forEach(function(balance) {
  console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
});} catch (e) {
    console.error("ERROR!", e);
  }
})()