const socket = io();

// Conectamos el cliente y escuchamos el evento messages
socket.on("messages", (data) => {
    render(data);
});

// Conectamos el cliente y escuchamos el evento producList
socket.on("productList", (data) => {
    renderItem(data);
})

// Funciones mensajes
function render(data) {
    const html = data.map((element) => {
        // Obtiene el valor del objeto donde se asigna el autor y el texto
        return `<div>
        <span><strong style='color:blue'>${element.author.email}</strong></span>
        <span style='color:brown'>${element.date}</span>
        <span style='font-style: italic; color:green'>
        <em>${element.text}</em></span>
        <img width="50" src="${mensaje.author.avatar}" alt=" ">
        </div>`;
    })
        .join(" "); // Acá separa por espacios el chat

    document.getElementById("mensajes").innerHTML = html; // Obtenemos el objeto mensajes

}
// El objeto message en server.js se encuentra vacío, pero esta función le agrega los parámetros al objeto y crea tanto el author como el text.
function addMessage(e) {
    const message = {
        author: {
            email: document.getElementById('email').value,
            name: document.getElementById('name').value,
            lastename: document.getElementById('lastname').value,
            age: document.getElementById('age').value,
            nickname: document.getElementById('nickname').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('textMessage').value
    }
    document.getElementsByClassName("form-control")[0].value = "";
    document.getElementsByClassName("form-control")[1].value = "";

    socket.emit("new-message", message);

    return false;
}




// Productos

function renderItem(data) {
    const html = data.map((elemento) => {
        let modelo = `<tr class="table-dark">
                        <td>${elemento.id}</td>
                        <td>${elemento.title}</td>
                        <td>${elemento.price}</td>
                        <td>${elemento.stock}</td>
                        <td><img width=50 src='${elemento.thumbnail}' alt="imgProducto"></td>
                        </tr>`
        return modelo
    }).join("\n")
    document.getElementById("idTbody").innerHTML = html
}
function addItem() {
    const producto = {
        title: document.getElementsById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }

    socket.emit("newProduct", producto)
}