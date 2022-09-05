class Usuario{
    constructor(nombre, apellido, mascotas, libros){
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = mascotas;
        this.libros = libros;
    }


getFullName(){
    return console.log(`El nombre y apellido es: ${this.nombre} ${this.apellido}`);
}

addMascota(nuevaMascota){
    this.mascotas.push(nuevaMascota);
}

countMascota(){
        return console.log(`Hay ${this.mascotas.length} mascotas`);
}

addBook(nombre, autor){
    this.libros.push({nombre:nombre, autor:autor});

}
getBookNames(){
    const Libro = []
    this.libros.map(libro=>
        Libro.push(libro.nombre)
    )
    return console.log(`Los libros que hay son: ${Libro}`);
    
}
}


const usuario = new Usuario('Santiago', 'Mineo', ['Mono', 'Hamster'], [{nombre: 'Harry Potter', autor: 'J.K Rowling'},{nombre: 'El Señor de los Anillos', autor: 'J. R. R. Tolkien'}]);

usuario.getFullName();
usuario.addMascota('Perro');
console.log(usuario.mascotas);
usuario.countMascota();
usuario.addBook('Cuentos de la Selva', 'Horacio Quiroga');
usuario.getBookNames();
