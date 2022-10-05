import { getNewId, removeObjectWithId } from "../utils/productosUtils.js";
import { Contenedor } from "../Class/Contenedor.js";

const contenedor = new Contenedor("./Data/productos.json");

//tengo que admitir que hubiera podido organizar mas la logica y meter todo en la clase
//pero no quiero mover tanto codigo, es por eso que en algunas rutas el procesamiento
// lo encuentras aqui, no en la clase

export const ping = (req, res) => {
  res.status(200).json({ message: "ok" });
};

// se hace llamado a este metodo en <ProductGrid/>
export const getAll = async (req, res) => {
  const allProducts = await contenedor.getAll();
  res.status(200).json(allProducts);
};
// se hace llamado a este metodo en <ProductDetail />
export const getOne = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(500)
      .json({ status: "ERROR", message: "Item No Encontrado" });

  try {
    const resultingProd = await contenedor.getById(id);
    res.status(200).json(resultingProd);
  } catch (e) {
    res.status(500).json({ status: "Error", message: "success" });
  }
};

// se hace llamado a este metodo en <Form/>
export const addOne = async (req, res) => {
  try {
    const url = req.body;
    const items = await contenedor.getAll();
    let modeledNewItem = {
      ...url,
      // crea un nuevo id dependiendo del ultimo item,
      id: getNewId(items.length),
      timestamp: new Date(),
      price: parseInt(url.price, 10),
      stock: parseInt(url.stock, 10),
      alcohol: parseInt(url.alcohol, 10)
    };
    // le hace push al array existente
    items.push(modeledNewItem);
    await contenedor.saveAll(items);
    res
      .status(200)
      .json({ status: "OK", message: "Item Agregado Satisfactoriamente" });
  } catch (e) {
    return res
      .status(501)
      .json({ status: "ERROR", message: "No se pudo agregar item", e });
  }
};

//agarra el id del item a modificar y la nueva data y la mezcla en el array existente
export const modifyOne = async (req, res) => {
  //prefiero hacer la logica aquii por que solo es reescribir el array
  const newItemData = req.body;
  const idOfItem = req.params.id;
  const allCurrentProducts = await contenedor.getAll();
  try {
    allCurrentProducts[idOfItem - 1] = {
      ...newItemData,
      id: allCurrentProducts[idOfItem - 1].id
    };
    await contenedor.saveAll(allCurrentProducts);
    return res
      .status(200)
      .json({ status: "OK", message: "Item Editado Satisfactoriamente" });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "ERROR", message: "No se pudo editar item", e });
  }
};

//se hace llamado a este metodo solo en <AdminButtons />
export const deleteOne = async (req, res) => {
  let itemId = parseInt(req.params.id, 10);
  const allCurrentItem = await contenedor.getAll();
  try {
    //funcion para borrar un item, arumnetos recibe la array y el id del elemento
    const resultingArray = removeObjectWithId(allCurrentItem, itemId);
    contenedor.saveAll(resultingArray);
    res
      .status(200)
      .json({ status: "OK", message: "Item Borrado Satisfactoriamente" });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "ERROR", message: "No se pudo borrar item", e });
  }
};
