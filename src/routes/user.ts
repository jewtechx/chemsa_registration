import { Router } from "express";

import { SIGNUP } from "../controllers/user.controller";

const router = Router();

router.post("/signup", SIGNUP);


export default router