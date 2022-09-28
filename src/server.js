const express = require(`express`)
const app = express()
const { Server: IOServer } = require('socket.io')
const path = require('path')
const puerto = 8080

//CLASES CHAT
const Contenedor = require('./contenedorChat')
const chatDb = new Contenedor("chatDb")


//APP
//CONFIG JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//RUTA ESTATICA
app.use(express.static(__dirname + `/../public`))

//SERVER
const expressServer = app.listen(puerto, (error) => {
    if(error) {
        console.log(`Hubo un error al iniciar el servidor: ${error}`)
    } else {
        console.log(`Servidor escuchando puerto ${puerto}`)
    }
})

const io = new IOServer(expressServer)

//ARRAYS
const productos = [{
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1
},
{
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2
},
{
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3
}
]

const chatArray = []

//SOCKETS
io.on('connection', socket => {
    console.log('Se conectó el cliente con id: ', socket.id)

    //PRODUCTOS
    socket.emit('server:productos', productos)
    socket.on('cliente:producto', productoInfo => {
        productos.push(productoInfo)
        io.emit('server:productos', productos)
    })

    //CHAT
    socket.emit('server:mensajes', chatArray)
    socket.on('cliente:mensaje', mensaje => {
        chatArray.push(mensaje);
        chatDb.save(mensaje);
        io.emit('server:mensajes', chatArray)
    })

})