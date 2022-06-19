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

  /*
  db.query(
    `SELECT array_remove(added_coins, '${coinId}')FROM user_data WHERE id = '${userId}'`,
    (error, results) => {
      let newAddedCoinsArray = results.rows[0].array_remove;
      db.query(
        `UPDATE user_data SET added_coins = '{${newAddedCoinsArray}}' WHERE id = '${userId}' RETURNING added_coins`,
        (error, results) => {
          let newArray = results.rows[0].added_coins;
          res.status(200).json({
            newArray,
            message: "Delete successful",
          });
        }
      );
    }
  );
  */
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

  /*
  try {
    db.query(
      `SELECT added_coins FROM user_data WHERE id = '${userId}'`,
      (error, results) => {
        let oldAddedCoinsList = results.rows[0].added_coins;
        let newAddedCoinsList = oldAddedCoinsList.concat(coinId);
        db.query(
          `UPDATE user_data SET added_coins = '{${newAddedCoinsList}}' WHERE id = '${userId}' RETURNING added_coins`,
          (error, results) => {
            let newAddedCoinsList = results.rows[0].added_coins;
            res.status(200).json({
              newAddedCoinsList,
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
  */
});

module.exports = router;
