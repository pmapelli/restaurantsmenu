const connection = require("../../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async create(request, response) {
    const { email, password } = request.body;
    const restaurant = await connection("restaurants")
      .where("email", email)
      .select("id", "name", "password")
      .first();

    if (!restaurant) {
      return response
        .status(400)
        .json({ error: "No restaurant found with this Login" });
    } else {
      bcrypt.compare(password, restaurant.password, (err, data) => {
        if (!err) {
          jwt.sign(
            {
              name: restaurant.name,
              id: restaurant.id,
            },
            process.env.SECRET,
            { expiresIn: "1d" },
            (err, token) => {
              if (!err) {
                return res.json({
                  name: restaurant.name,
                  token,
                });
              }
            }
          );
        }
      });
    }
  },
};
