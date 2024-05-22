import { servicesProducts } from "../services/product-services.js";

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector("[data-product]");
    const form = document.querySelector("[data-form]");

    function crearCard(name, precio, imagen, id) {
        const card = document.createElement("div");
        card.classList.add("card");

        const imageUrl = imagen ? imagen : '';

        card.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            <div class="card-container--info">
                <p>${name}</p>
                <div class="card-container--value">
                    <p>${precio}</p>
                    <img class="bote_basura" src="img/bote-de-basura.png" alt="icono bote de basura" data-id="${id}">
                </div>
            </div>      
        `;

        card.querySelector(".bote_basura").addEventListener('click', () => {
            servicesProducts.eliminarProducto(id).then(() => {
                card.remove();
            }).catch(err => console.log(err));
        });

        return card;
    }

    const render = async () => {
        if (productContainer) {
            try {
                const listProduct = await servicesProducts.productoList();
                console.log("listProduct:", listProduct);

                if (Array.isArray(listProduct)) {
                    listProduct.forEach((product) => {
                        productContainer.appendChild(
                            crearCard(product.name, product.precio, product.imagen, product.id)
                        );
                    });
                } else {
                    console.error('Expected an array but got:', listProduct);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
    };

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nameInput = document.querySelector("[data-name]");
            const precioInput = document.querySelector("[data-precio]");
            const fileInput = document.querySelector("[data-image]");

            if (!nameInput || !precioInput || !fileInput || !fileInput.files[0]) {
                console.error('Form inputs not found or file not selected');
                return;
            }

            const name = nameInput.value;
            const precio = precioInput.value;
            const file = fileInput.files[0];

            try {
                const imageUrl = await servicesProducts.uploadImage(file);
                await servicesProducts.crearProducto(name, precio, imageUrl);
                console.log("Producto creado");
                window.location.href = 'index.html';
            } catch (err) {
                console.error('Error creating product:', err);
            }
        });
    }

    render();
});
