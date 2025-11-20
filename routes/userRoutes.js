import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.route("/")
          .get(userController.getAllUsersList)
          .post(userController.addNewUsers)
          .put(userController.updateUserDetails);

router.route("/:id")
          .post(userController.getUserDetailByID);
export default router;
