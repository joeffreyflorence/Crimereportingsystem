import express from "express";
import userController from "../controller/user-controller.js";
import crimeController from "../controller/crime-controller.js";

import accidentController from "../controller/accident-controller.js";

import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// Crime API
userRouter.post("/api/crimes", crimeController.create);
userRouter.get("/api/crimes/:crimeId", crimeController.get);
userRouter.put("/api/crimes/:crimeId", crimeController.update);
userRouter.delete("/api/crimes/:crimeId", crimeController.remove);
userRouter.get("/api/crimes", crimeController.search);

// Accident API
userRouter.post("/api/accidents", accidentController.create);
userRouter.get("/api/accidents/:accidentId", accidentController.get);
userRouter.put("/api/accidents/:accidentId", accidentController.update);
userRouter.delete("/api/accidents/:accidentId", accidentController.remove);
userRouter.get("/api/accidents", accidentController.search);

export { userRouter };
