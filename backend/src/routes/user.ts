import express from "express";
import * as UserController from "../controller/user";


const router = express.Router()
router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)

export default router