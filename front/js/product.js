// const urlSearch = window.location.search;
// console.log(urlSearch)

const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams);

const idProduct = searchParams.get("id")

const urlProduct = `http://localhost:3000/api/products/${idProduct}`
console.log(urlProduct);

// Appel des éléments du produit
function fetchProduct() {
    fetch(urlProduct)
        .then((response) => response.json())
        .then((object) => {
            console.log(object)
            // affichage de la photo canapé
            const imageObject = document.createElement("img");
            imageObject.src = object.imageUrl;
            imageObject.alt = object.altTxt;
            document.querySelector(".item__img").appendChild(imageObject);
            // affichage nom du canapé
            const titleObject = document.getElementById("title");
            titleObject.innerText = object.name;
            // affichage du prix (ajout d'un espace entre le nbre et l'€)
            const priceObject = document.getElementById("price");
            priceObject.innerText = `${object.price} `;
            //affichage de la description
            const descriptionObject = document.getElementById("description");
            descriptionObject.innerText = object.description;
            // choix des couleurs
            const colorsObject = document.getElementById("colors");
            // intégration des couleur dans le dropdown menu
            object.colors.map(function (color) {
                const colorOption = document.createElement("option");
                colorsObject.appendChild(colorOption);
                // colorOption.value = color;
                colorOption.innerText = color;
            });
        }
        )
}

// appel de la fonction qui affichera les éléments de l'objet "canapé"
fetchProduct();