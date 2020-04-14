const connection = require("../../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async create(request, response) {
    const { email, password } = request.body;
    const restaurant = await connection("restaurants")
      .where("email", email)
      .select("*")
      .first();

    if (!restaurant) {
      return response
        .status(400)
        .json({ error: "No restaurant found with this Login" });
    } else {
      if (!bcrypt.compare(password, restaurant.password)) {
        return res.status(401).json({ error: "Password does not match" });
      }

      const { id, name, email } = restaurant;

      return response.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign(
          { name: restaurant.name, id: restaurant.id },
          process.env.SECRET,
          {
            expiresIn: process.env.EXPIRESIN,
          }
        ),
      });
    }
  },
};
