import express from "express";
import {
  ping,
  getAll,
  getOne,
  addOne,
  deleteOne,
  modifyOne
} from "../Controllers/productosController.js";

//middleware de verification, lo hago por headers, manda un header de admin o cliente y deniega o accede al pedido
import verification from "../middlewares/verification.js";

const productosRouter = express.Router();

productosRouter.get("/ping", ping);
productosRouter.get("/", getAll);
productosRouter.get("/:id", getOne);
productosRouter.post("/", verification.isAdmin, addOne);
productosRouter.put("/:id", verification.isAdmin, modifyOne);
productosRouter.delete("/:id", verification.isAdmin, deleteOne);

export default productosRouter;
