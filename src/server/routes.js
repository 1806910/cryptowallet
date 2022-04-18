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

//Request para dados do usuário
router.post("/user-data", (req, res) => {
  const { token } = req.body;
  let accessToken = token.substring(1, token.length - 1);

  try {
    db.query(
      `SELECT id, name, email, added_coins, access_token FROM user_data WHERE access_token = '${accessToken}'`,
      (error, results) => {
        const user = {
          id: results.rows[0].id,
          name: results.rows[0].name,
          email: results.rows[0].email,
          added_coins: results.rows[0].added_coins,
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

/**
 * Private route
 */
router.use(authMiddleware);

router.post("/delete-coin", async (req, res) => {
  const { userId, newAddedCoinsArray } = req.body;

  let auxArray = [];

  newAddedCoinsArray.forEach((element) => {
    auxArray.push(element.id);
  });

  db.query(
    `UPDATE user_data SET added_coins = '{${auxArray}}' WHERE id = '${userId}' RETURNING added_coins`,
    (error, results) => {
      const newArray = { added_coins: results.rows[0].added_coins };
      res.status(200).json({
        newArray,
        message: "Delete successful",
      });
    }
  );
});

module.exports = router;