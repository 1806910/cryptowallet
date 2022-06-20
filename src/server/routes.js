const express = require("express");
const jwt = require("jsonwebtoken");

const authMiddleware = require("./auth");
const db = require("./db");

const router = express.Router();

//Request para login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "All fields must be filled correctly",
    });
  } else {
    try {
      db.query(
        `SELECT COUNT(*) FROM user_data WHERE email = '${email}'`,
        (error, results) => {
          if (results.rows[0].count > 0) {
            db.query(
              `SELECT password FROM user_data WHERE email = '${email}'`,
              (error, results) => {
                if (password === results.rows[0].password) {
                  db.query(
                    `SELECT id, name, email FROM user_data WHERE email = '${email}'`,
                    (error, results) => {
                      const user = {
                        id: results.rows[0].id,
                        name: results.rows[0].name,
                        email: results.rows[0].email,
                      };

                      const token = jwt.sign(user, "PRIVATEKEY");

                      db.query(
                        `UPDATE user_data SET access_token = '${token}' WHERE email = '${email}'`
                      );

                      res.status(200).json({
                        token,
                        message: "Login successful",
                      });
                    }
                  );
                } else {
                  res.status(400).json({
                    message: "Email or Password doesnt exist",
                  });
                }
              }
            );
          } else {
            res.status(400).json({
              message: "Email or Password doesnt exist",
            });
          }
        }
      );
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      });
    }
  }
});

/**
 * Private route
 */
router.use(authMiddleware);

router.post("/edit", (req, res) => {
  const { userId, coinId, coinQTT, coinBuyprice } = req.body;

  let selectedCoinObject = { coin: coinId, qtt: coinQTT, buyprice: coinBuyprice };

  db.query(
    `SELECT teste_json FROM user_data WHERE id='${userId}'`,
    (error, results) => {
      let oldAddedCoinsList = results.rows[0].teste_json;

      for (let i = 0; i < oldAddedCoinsList.length; i++) {
        if (oldAddedCoinsList[i].coin === coinId) {
          db.query(
            `UPDATE user_data SET teste_json = jsonb_set(teste_json, '{${i}}', '{"coin":"${coinId}","qtt":"${coinQTT}","buyprice":"${coinBuyprice}"}', true) WHERE id='${userId}' RETURNING teste_json`,
            (error, results) => {
              let newAddedCoinsArray = results.rows[0].teste_json;
              res.status(200).json({
                newAddedCoinsArray,
              });
            }
          );
        }
      }
    }
  );
});

router.delete("/delete-coin/:userId/:coinId", (req, res) => {
  const { userId, coinId } = req.params;

  db.query(
    `SELECT teste_json FROM user_data WHERE id='${userId}'`,
    (error, results) => {
      let oldAddedCoinsList = results.rows[0].teste_json;

      for (let i = 0; i < oldAddedCoinsList.length; i++) {
        if (oldAddedCoinsList[i].coin === coinId) {
          db.query(
            `UPDATE user_data SET teste_json=teste_json -${i} WHERE id='${userId}' RETURNING teste_json`,
            (error, results) => {
              let newAddedCoinsArray = results.rows[0].teste_json;
              res.status(200).json({
                newAddedCoinsArray,
              });
            }
          );
        }
      }
    }
  );
});

//Request para dados do usuário
router.post("/user-data", (req, res) => {
  const { token } = req.body;
  let accessToken = token.substring(1, token.length - 1);

  try {
    db.query(
      `SELECT id, name, email, added_coins, access_token, teste_json FROM user_data WHERE access_token = '${accessToken}'`,
      (error, results) => {
        const user = {
          id: results.rows[0].id,
          name: results.rows[0].name,
          email: results.rows[0].email,
          added_coins: results.rows[0].added_coins,
          teste_json: results.rows[0].teste_json,
        };
        res.status(200).json({
          user,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-coin", (req, res) => {
  const { userId, coinId } = req.body;

  try {
    db.query(
      `UPDATE user_data SET teste_json = COALESCE(teste_json, '[]'::jsonb) || '{"coin": "${coinId}", "qtt":"0", "buyprice":"0"}' ::jsonb WHERE id = '${userId}' RETURNING teste_json`,
      (error, results) => {
        let newAddedCoinsList = results.rows[0].teste_json;
        res.status(200).json({
          newAddedCoinsList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
