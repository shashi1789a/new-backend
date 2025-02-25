import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js ";
import {uploade} from "../middlewares/multer.middleware.js";
import { loginUser, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();

router.route("/register").post(
    uploade.fields([
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


router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;


