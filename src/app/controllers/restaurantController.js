const connection = require("../../database/connection");
const generateUniqueId = require("../../utils/generateUniqueId");
const bcrypt = require("bcryptjs");

module.exports = {
  async index(request, response) {
    const restaurants = await connection("restaurants").select("*"); //aguarde junto com async

    return response.json(restaurants);
  },

  async create(request, response) {
    try {
      const {
        name,
        email,
        whatsapp,
        address,
        city,
        uf,
        password,
      } = request.body;

      const restaurant = await connection("restaurants")
        .where("email", email)
        .select("*")
        .first();

      if (restaurant) {
        return response.status(400).send({ error: "Email already exists" });
      }

      const id = generateUniqueId();

      bcrypt.hash(password, 8, async (err, password) => {
        if (err) {
          response.json({ error: "Server Error" });
        }
        await connection("restaurants").insert({
          id,
          name,
          email,
          password,
          whatsapp,
          address,
          city,
          uf,
        });
      });

      return response.json(id);
    } catch (err) {
      return response.status(400).send({ error: "Registration failed" });
    }
  },
};
