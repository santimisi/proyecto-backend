import { getNewCartId, removeObjectWithId } from "../utils/carritoUtils.js";
import { Contenedor } from "../Class/Contenedor.js";

const contenedor = new Contenedor("./Data/carritos.json");

export const ping = (req, res) => {
  res.status(200).json({ status: "OK" });
};

// funcion correspondiente al get de todods los carritos en existencia
export const getCarts = async (req, res) => {
  try {
    const allCarts = await contenedor.getAll();
    res.status(200).json(allCarts);
  } catch (e) {
    res.status(500).json({ status: "error", message: "algo salio mal" });
  }
};

// esta funcion es triggereada por el envio del formulario con POST en carrito modal
export const createNewCart = async (req, res) => {
  const newCart = req.body;
  if (newCart.length < 1 || Object.keys(newCart).length === 0) {
    res.status(500).json({ status: "error", message: "Tu carrito esta vacio" });
  } else {
    const allCarts = await contenedor.getAll();
    allCarts.push({
      productos: newCart,
      id: getNewCartId(allCarts.length),
      timeStamp: new Date()
    });
    contenedor.saveAll(allCarts);
    res
      .status(200)
      .json({ status: "OK", id: allCarts[allCarts.length - 1].id });
  }
};

// a partir de aqui no se pueden probar estos endpoints ya que no hay front end para ellas,
//se tienen que probar con POSTMAN o INSOMNIA
export const deleteCart = async (req, res) => {
  const id = req.params.id;
  try {
    const allCarts = await contenedor.getAll();
    if (id > allCarts.length || id <= 0)
      return res
        .status(500)
        .json({ status: "ERROR", error: "No hay item con ese ID" });
    const resultingArray = removeObjectWithId(allCarts, JSON.parse(id));
    await contenedor.saveAll(resultingArray);
    res.status(200).json({ status: "success", message: "carrito borrado" });
  } catch (e) {
    res.status(500).json({ status: "error", message: "algo salio mal" });
  }
};

export const getProductInCart = async (req, res) => {
  const id = req.params.id;
  try {
    const allCarts = await contenedor.getAll();
    if (id > allCarts.length || id <= 0)
      return res.status(500).json({
        status: "ERROR",
        error: `No hay productos para el carrito con id:${id}`
      });
    res.status(200).json(allCarts[id - 1].productos);
  } catch (e) {
    res.status(500).json({ status: "error", message: "algo salio mal" });
  }
};

export const addProductInExistingCart = async (req, res) => {
  const cartId = JSON.parse(req.params.id);
  const itemToAdd = req.body;
  let allCarts = await contenedor.getAll();
  if (cartId > allCarts.length || cartId < 1)
    return res.status(500).json({
      status: "error",
      message: `No existe un carrito con este id:${cartId}`
    });
  //esta funcion verifica que el item que se intenta agregar exista dentro de un carrito existente,
  //si existe en el carrito, solo aumenta una unidad el mismo item, si no existe, create el nuevo item
  // y lo adjunta al carrito
  try {
    let doesItemExist = allCarts[cartId - 1].productos.find(
      (obj) => obj.id === itemToAdd.id
    );
    if (itemToAdd.id < 1)
      return res.status(500).json({
        status: "error",
        message:
          "el id del item a meter dentro del carrito, no puede ser menor a 0"
      });
    if (doesItemExist) {
      const index = allCarts[cartId - 1].productos.findIndex((object) => {
        return object.id === itemToAdd.id;
      });
      allCarts[cartId - 1].productos[index].quantity++;
      await contenedor.saveAll(allCarts);
      return res.status(200).json({
        status: "success",
        message: `Item existente en carrito, sole se agrega una unidad mas al carrito con id: ${cartId}`
      });
    } else {
      allCarts[cartId - 1].productos.push(itemToAdd);
      await contenedor.saveAll(allCarts);
      res.status(200).json({
        status: "success",
        message: `Item agregado al carrito con id: ${cartId}`
      });
    }
  } catch (e) {
    res.status(500).json({ status: "error", message: "algo salio mal" });
  }
};

//toma el id del carrito y del item, valida que todos los numeros sean existentes y no tengan overflow,
//si existe se crea el indice de donde esta el item, lo borra, y se guarda con el saveAll
export const deleteItemInCart = async (req, res) => {
  const cartID = JSON.parse(req.params.id);
  const itemID = JSON.parse(req.params.id_prod);
  let allCarts = await contenedor.getAll();
  if (cartID > allCarts.length || cartID < 1)
    return res.status(500).json({
      status: "error",
      message: `No existe un carrito con este id:${cartID}`
    });
  try {
    let doesItemExist = allCarts[cartID - 1].productos.find(
      (obj) => obj.id === itemID
    );
    if (itemID < 1)
      return res.status(500).json({
        status: "error",
        message:
          "el id del item a borrar dentro del carrito, no puede ser menor a 0"
      });
    if (doesItemExist) {
      const index = allCarts[cartID - 1].productos.findIndex((object) => {
        return object.id === itemID;
      });
      allCarts[cartID - 1].productos.splice(index, 1);
      await contenedor.saveAll(allCarts);
      return res.status(200).json({
        status: "success",
        message: `Item con id:${itemID} borrado de carrito con id: ${cartID}`
      });
    } else {
      res.status(500).json({
        status: "error",
        message: `Item no existe con ese ID`
      });
    }
  } catch (e) {
    res.status(500).json({ status: "error", message: "algo salio mal" });
  }
};
