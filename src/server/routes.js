const express = require('express');
const jwt = require('jsonwebtoken');

const authMiddleware = require('./auth');

const router = express.Router();

router.post('/login', (req, res) => {
  console.log("Bateu no login")

  const user = {
    id: 1,
    name: 'Mateus Silva',
    company: 'DevAcademy',
    website: 'https://devacademy.com.br',
  };

  return res.json({
    user,
    token: jwt.sign(user, 'PRIVATEKEY'),
  });
});

/**
 * Private route
 */
router.use(authMiddleware);

router.get('/mywallet', async (req, res) => {
  const userInfo = {
    userName: 'Alexandre',
    userEmail: 'alebarros02@gmail.com',
    userPassword: '123456',
    coins: [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'eth',
      },
      {
        id: 'klaytn',
        name: 'Klaytn',
        symbol: 'klay',
      },
    ]
  }

  return res.json({
    userInfo
  });
});

module.exports = router;