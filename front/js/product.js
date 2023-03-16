// const urlSearch = window.location.search;
// console.log(urlSearch)

const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams);

const idProduct = searchParams.get("id")

const urlProduct = `http://localhost:3000/api/products/${idProduct}`
console.log(urlProduct);

// Fonction d'appel des éléments du produit sélectionné depuis l'index.html
function fetchProduct() {
    fetch(urlProduct)
        .then((response) => response.json())
        .then((object) => {
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
            // intégration des couleurs dans le dropdown menu
            object.colors.map(color => {
                const colorOption = document.createElement("option");
                colorOption.value = color;
                colorOption.innerText = color;
                colorsObject.appendChild(colorOption);
            });
        }
        )
}

// Appel de la fonction qui affichera les éléments de l'objet "canapé"
fetchProduct();


const addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", (event) => {
    event.preventDefault();
    let selectedColor = document.querySelector("#colors").value;
    let selectedQuantity = document.querySelector("#quantity").value;
    let selectedProductName = document.getElementById("title").innerText;
    ;
    const addObject = {
        name: selectedProductName,
        id: idProduct,
        quantity: selectedQuantity,
        color: selectedColor,
    }
    if (selectedColor == false) {
        alert("Merci de sélectionner une couleur");
    } else if (selectedQuantity < 1 || selectedQuantity > 100) {
        alert("Merci de choisir une quantité entre 1 et 100");
    } else {
        alert("Votre article a bien été ajouté au panier")
    }
    console.log(addObject);

    /*-----------------Local Storage-----------*/
    // Déclaration de la variable de stock des clés/valeurs du local storage + conversion JSON > JS
    let objectToLocalStorage = JSON.parse(window.localStorage.getItem("produit"));
    // écoute du localstorage
    if (objectToLocalStorage) {
        objectToLocalStorage.push(addObject);
        window.localStorage.setItem("produit", JSON.stringify(objectToLocalStorage));
    }
    //------- stock les choix de l'user dans le local storage-----//
    else {
        objectToLocalStorage = [];
        objectToLocalStorage.push(addObject);
        window.localStorage.setItem("produit", JSON.stringify(objectToLocalStorage));
    }

});
