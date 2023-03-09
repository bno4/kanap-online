// const urlSearch = window.location.search;
// console.log(urlSearch)

const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams);

const idProduct = searchParams.get("id")

const urlProduct = `http://localhost:3000/api/products/${idProduct}`
console.log(urlProduct);

function fetchObjectProduct() {
    fetch(urlProduct)
        .then((response) => response.json())
        .then((object) => {
            console.log(object)
            // affichage de la photo canapée
            const imageObject = document.createElement("img");
            imageObject.src = object.imageUrl;
            imageObject.alt = object.altTxt;
            document.querySelector(".item__img").appendChild(imageObject);
            // affichage nom du canapée
            const titleObject = document.getElementById("title");
            titleObject.innerText = object.name;
            // affichage du prix (ajout d'un espace entre le nbre et l'€)
            const priceObject = document.getElementById("price");
            priceObject.innerText = `${object.price} `;
            //affichage de la description
            const descriptionObject = document.getElementById("description");
            descriptionObject.innerText = object.description;
        }
        )
}

// appel de la fonction qui affichera les éléments de l'objet "canapé"
fetchObjectProduct()