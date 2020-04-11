const connection = require("../../database/connection");

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;
    const [count] = await connection("menus").count();

    const menus = await connection("menus")
      .join("restaurants", "restaurants.id", "=", "menus.restaurant_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "menus.*",
        "restaurants.name",
        "restaurants.email",
        "restaurants.whatsapp",
        "restaurants.address",
      ]);

    response.header("X-Total-Count", count["count(*)"]);

    return response.json(menus);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const restaurant_id = request.headers.authorization; //id usuario logado

    const [id] = await connection("menus").insert({
      title,
      description,
      value,
      restaurant_id,
    });
    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const restaurant_id = request.headers.authorization;

    const menu = await connection("menus")
      .where("id", id)
      .select("restaurant_id")
      .first();

    if (menu.restaurant_id != restaurant_id) {
      return response.status(401).json({ error: "Operation not permitted." });
    }
    await connection("menus").where("id", id).delete();

    return response.status(204).send(); //status 204 respostar sem conteúdo
  },
};
