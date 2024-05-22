const productoList = () => {
    return fetch("http://localhost:3000/productos")
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const crearProducto = (name, precio, imagen) => {
    return fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            precio,
            imagen,
        }),
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const eliminarProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => data.imagenUrl)
    .catch((err) => console.log(err));
};

export const servicesProducts = {
    productoList,
    crearProducto,
    eliminarProducto,
    uploadImage,
};
