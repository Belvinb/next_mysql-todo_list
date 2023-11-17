import express from "express"
import  {addNewTodo, deletetodo, getAllTodos } from "../controllers/todoControllers.js";
const  router = express.Router();

router.get("/alltodos",getAllTodos)
router.post("/newtodo",addNewTodo)
router.delete("/deletetodo/:id",deletetodo)

export default router
