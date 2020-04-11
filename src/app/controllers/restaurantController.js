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
      const { name, email, whatsapp, password, city, uf } = request.body;

      const id = generateUniqueId();

      bcrypt.hash(password, 8, async (err, result) => {
        if (err) {
          res.json({ error: "Server Error" });
        }
        await connection("restaurants").insert({
          id,
          name,
          email,
          password,
          whatsapp,
          city,
          uf,
        });
      });

      return response.json(id);
    } catch (err) {
      return res.status(400).send({ ßerror: "Registration failed" });
    }
  },
};
