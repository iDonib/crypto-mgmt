const fetchWalletBalance = require("../helpers/fetchWalletBalance");

const seedUsers = [
  {
    name: "Erling Haaland",
    email: "haaland@mancity.com",
    password: "hack",
    contact: "1234567890",
    age: 30,
    gender: "male",
    wallets: [],
  },
  {
    name: "Sergio Aguero",
    email: "aguero@mancity.com",
    password: "hack",
    contact: "9876543210",
    age: 28,
    gender: "male",
    wallets: [],
  },
];

const seedWallets = [
  {
    owner: "",
    address: "0x161ba15a5f335c9f06bb5bbb0a9ce14076fbb645",
  },
  {
    owner: "",
    address: "0xf977814e90da44bfa03b6295a0616a897441acec",
  },
  {
    owner: "",
    address: "0xa180fe01b906a1be37be6c534a3300785b20d947",
  },
];

// Fetch balances for each wallet and update the seedWallets array
(async () => {
  for (let i = 0; i < seedWallets.length; i++) {
    const walletData = seedWallets[i];
    const balance = await fetchWalletBalance(walletData.address);
    seedWallets[i].balance = balance;
  }
})();

module.exports = { seedUsers, seedWallets };
