const express = require("express");
const restaurantController = require("./app/controllers/restaurantController");
const menuController = require("./app/controllers/menuController");
const profileController = require("./app/controllers/profileController");
const sessionController = require("./app/controllers/sessionController");
const { auth, id } = require("./middlewares/auth");
const routes = express.Router();

routes.post("/sessions", sessionController.create);

routes.get("/profile", auth, profileController.index);

routes.get("/restaurants", restaurantController.index);
routes.post("/restaurants", restaurantController.create);

routes.get("/menus", menuController.index);
routes.post("/menus", menuController.create);
routes.delete("/menus/:id", menuController.delete);

module.exports = routes;
