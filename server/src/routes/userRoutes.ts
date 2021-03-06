import express from "express";

import multerUser from "../config/userMulter";

import Middleware from "../middleware/auth";
import Controller_user from "../controllers/userController";
import Controller_userConfirmation from "../controllers/userConfimationController";
import Controller_avatar from "../controllers/avatarController";
import Controller_address from "../controllers/addressController";
import Controller_order from "../controllers/orderController";

const routes = express.Router();

const middleWare = new Middleware();
const userController = new Controller_user();
const userConfirmationController = new Controller_userConfirmation();
const avatarController = new Controller_avatar();
const addressController = new Controller_address();
const orderController = new Controller_order();

routes.post("/login", userController.login);

routes.post("/register", userController.register);

routes.get("/account", middleWare.Auth, userController.validifyToken);

routes.get("/users/me", middleWare.Auth, userController.index);

routes.put("/users/me", middleWare.Auth, userController.update);

routes.post(
  "/users/confirmation",
  middleWare.Auth,
  userConfirmationController.sendConfirmationEmail
);

routes.get(
  "/users/confirmation/:token",
  userConfirmationController.receiveConfirmationEmail
);

routes.post(
  "/users/newsletter",
  middleWare.Auth,
  userConfirmationController.toggleSignNewsletter
);

routes.get("/users/address", middleWare.Auth, addressController.index);

routes.post("/users/address", middleWare.Auth, addressController.store);

routes.put("/users/address", middleWare.Auth, addressController.update);

routes.delete("/users/address", middleWare.Auth, addressController.destroy);

routes.get("/users/purchase", middleWare.Auth, orderController.list);

routes.put(
  "/users/change_password",
  middleWare.Auth,
  userController.changePassword
);

routes.get("/users/avatar", middleWare.Auth, avatarController.show);

routes.post(
  "/users/avatar",
  middleWare.Auth,
  multerUser.single("image"),
  avatarController.store
);

export default routes;
