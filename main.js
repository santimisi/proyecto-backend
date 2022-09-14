const express = require(`express`)
const app = express()
const rutas = require('./routes/index')

//Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Public
app.get(`/api`, (req , res ) => {
    res.sendFile(__dirname + `/public/index.html`)
})

//Rutas
app.use('/api/productos', rutas)


//Server
app.listen(8080, ()=> {
    console.log("Escuchando el puerto 8080")
})