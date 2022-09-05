const fs = require('fs');

class Contenedor {
    constructor(filePath) {
        this.filePath = filePath;
      }
    async save(producto){
        try {
            await fs.promises.writefile ('productosSegundoDesafio.txt', JSON.stringify(producto, null, 2), "utf-8");
        } catch (e) {
            console.log(e);  
        }
    }
    async getAll(){
        try {
            const contenido = await fs.promises.readFile ('productosSegundoDesafio.txt', 'utf-8');
            return JSON.parse(contenido);
        } catch (error) {}
    }
    async getById(id) {
        const contenido = await this.getAll();
        const productoBuscado = contenido.filter((producto) => producto.id == id);
        console.log(productoBuscado);
    }
    async deleteById(id) {
        const contenido = await this.getAll();
        const productoBuscado = contenido.filter((producto) => producto.id != id)
        fs.promises.writeFile('productosSegundoDesafio.txt', JSON.stringify(productoBuscado, null, 2))
        console.log(`Objeto con id : ${id} borrado`)
    } catch (err) {
        console.log(`Hubo un error en recuperar el objeto por id : ${err}`)
    }
    async deleteAll() {
        await fs.promises.writeFile('productosSegundoDesafio.txt', JSON.stringify([]));
    }
}

const contenedor = new Contenedor();
contenedor.getAll();
contenedor.getById(2)
contenedor.deleteById(1)
/*contenedor.deleteAll()*/
