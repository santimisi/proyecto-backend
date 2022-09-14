import * as fs from "fs"
import { writeFile, readFile } from "fs/promises";

export class Contenedor {
    constructor(filePath) {
        this.filePath = filePath;
      }
      async save(itemToBeCreated) {
        const contenido = await this.getAll();
        const newObjId = this.createId(allCurrentItems);
        const newCompleteObj = { ...itemToBeCreated, id: newObjId };
        contenido.push(newCompleteObj);
        try {
          await writeFile(this.filePath, JSON.stringify(allCurrentItems, null, 2));
        } catch (e) {
          throw console.error(`Error al guargar nuevo obnjeto, mensaje: ${e}`);
        }
        return newCompleteObj.id;
      }
      async getAll() {
        try {
          const contenido = await readFile(this.filePath, {
            encoding: "utf-8"
          });
          return JSON.parse(contenido);
        } catch (error) {

          await writeFile(this.filePath, JSON.stringify([]), (err) =>
            console.log("Couldn't Create File: " + err)
          );
          return [];
        }
      }

    async getById(id) {
        const contenido = await this.getAll();
        const productoBuscado = contenido.filter((producto) => producto.id == id);
        console.log(productoBuscado);
    }
    async deleteById(id) {
        try {
            let contenido = this.arrayProductos
            let contenidoFiltrado = contenido.filter(i => i.id != id)
            this.arrayProductos = contenidoFiltrado
            console.log(`Objeto con id : ${id} eliminado`)
        } catch (err) {
            console.log(`Hubo un error en recuperar el objeto por ID : ${err}`)
        }
    }
    async deleteAll() {
        await fs.promises.writeFile('productosSegundoDesafio.txt', JSON.stringify([]));
    }
    async modifyById(id, newObjProps) {
        let contenido = await this.getAll();
        const itemToModify = await this.getById(id);

        const modifiedArray = {
          ...itemToModify,
          title: newObjProps.title ? newObjProps.title : itemToModify.title,
          thumbnail: newObjProps.thumbnail
            ? newObjProps.thumbnail
            : itemToModify.thumbnail,
          price: newObjProps.price ? newObjProps.price : itemToModify.price
        };
        //reemplaza el item anterior
        contenido[id - 1] = modifiedArray;
        await writeFile(this.filePath, JSON.stringify(allCurrentItems, null, 2));

        return itemToModify.id;
      }
      createId(contenido) {

        let newID = contenido.length > 0 ? allCurrentItems.at(-1).id + 1 : 1;
        return newID;
      }
      async postProduct(producto) {
        try {
            let id = Contenedor.idContador
            let nuevoProducto = {...producto , id : id }
            this.arrayProductos.push(nuevoProducto)
            console.log(`Objeto con id : ${nuevoProducto.id} agregado`)
            return nuevoProducto
        } catch (err) {
            console.log(`No se pudeo agregar el objeto: ${err}`)
        }
    }
}

const contenedor = new Contenedor();
contenedor.getAll();
contenedor.getById(2)