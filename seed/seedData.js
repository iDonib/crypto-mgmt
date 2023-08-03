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
    address: "0x3f08f17973ab4124c73200135e2b675ab2d263d9",
  },
  {
    owner: "",
    address: "0x48414f981646de5d184502979e77c00c1da68b38",
  },
  {
    owner: "",
    address: "0xd2a38d26e6d529ac6c64473c8e9ce24e6704a069",
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
