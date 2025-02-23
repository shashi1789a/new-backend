import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js ";
import {uploded} from "../middlewares/multer.middleware.js";



const router = Router();

router.route("/register").post(
    uploded.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {                                      //it is used for img uplode 
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

export default router;


