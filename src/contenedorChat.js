const fs = require('fs');

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }
    
    async save (mensaje) {
        try{
            const msjSave = `UserName: ${mensaje.username}, Mensaje: ${mensaje.mensaje}\n`;
            await fs.promises.appendFile(`./${this.archivo}.txt`, msjSave);
        } catch(error) {
            console.log(`No se pudo guardar el mensaje: ${error}`)
        }
    }
    async getAll () {
        let contenido = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
        return contenido;
    }
    
};

module.exports = Contenedor;