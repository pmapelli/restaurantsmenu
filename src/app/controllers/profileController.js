const connection = require("../../database/connection");

module.exports = {
  async index(request, response) {
    const { restaurant_id } = request.params;

    const menus = await connection("menus")
      .where("restaurant_id", restaurant_id)
      .select("*");
    return response.json(menus);
  },
};
