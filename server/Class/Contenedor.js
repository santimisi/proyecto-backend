import { writeFile, readFile } from "fs/promises";

export class Contenedor {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getById(id) {
    const allCurrentItems = await this.getAll();
    //regresa un nuevo array con el resultado encontrado, si es undef mete error, si no lo regresa.
    const filteredArray = allCurrentItems.find(
      (item) => item.id === JSON.parse(id)
    );
    if (!filteredArray) throw new Error("No existe item con ese Id");
    return filteredArray;
  }

  async getAll() {
    try {
      const allCurrentItems = await readFile(this.filePath, {
        encoding: "utf-8"
      });
      return JSON.parse(allCurrentItems);
    } catch (error) {
      //controlo error por si se quiere imprimir todos y no hay archivo existente, si no hay lo crea y le pone un array
      await writeFile(this.filePath, JSON.stringify([]), (err) =>
        console.log("Couldn't Create File: " + err)
      );
      return [];
    }
  }

  async saveAll(allItems) {
    await writeFile(this.filePath, JSON.stringify(allItems));
  }

  createId(allCurrentItems) {
    //crea un nuevo ID y asigna 1 si es el primero, si no agarra el ultimo id del ultimo id y le suma 1
    let newID = allCurrentItems.length > 0 ? allCurrentItems.length + 1 : 1;
    return newID;
  }
}
