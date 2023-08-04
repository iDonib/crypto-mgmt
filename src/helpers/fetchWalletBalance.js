const axios = require("axios");

const fetchWalletBalance = async (address) => {
  const apiKey = process.env.BSCSCAN_API_KEY;
  const apiUrl = `https://api.bscscan.com/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;

  const response = await axios.get(apiUrl);
  const balance = response.data.result;

  // Convert the balance from wei to BNB
  const balanceInBNB = parseFloat(balance) / 10 ** 18;

  return balanceInBNB;
};

module.exports = fetchWalletBalance;
