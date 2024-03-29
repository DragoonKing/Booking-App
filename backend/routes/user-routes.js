const express = require ("express");
const { deleteUser, getAllUser, signup, updateUser, login,getBookingsofUser, getUserById } = require ("../controllers/user-controller");
const userRouter = express.Router();


userRouter.get("/", getAllUser);
userRouter.post("/signup", signup);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);
userRouter.get("/bookings/:id",getBookingsofUser);


module.exports = userRouter;      