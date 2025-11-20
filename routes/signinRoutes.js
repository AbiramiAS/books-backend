import express from "express";
import registerController from "../controllers/registerController.js";

const router = express.Router();

router.route("/").post(registerController.signinUser);

export default router;