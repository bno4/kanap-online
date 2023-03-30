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
    let selectedPriceName = document.getElementById("price").innerText;
    let selectedImage = document.querySelector(".item__img img").src;
    let selectedImageAlt = document.querySelector(".item__img img").alt;

    const addObject = {
        id: idProduct,
        name: selectedProductName,
        image: selectedImage,
        alt_image: selectedImageAlt,
        color: selectedColor,
        quantity: parseInt(selectedQuantity),
        // price: parseInt(selectedPriceName),
        // totalPrice: parseInt(selectedQuantity) * parseInt(selectedPriceName),
    }
    if (selectedColor == false) {
        alert("Merci de sélectionner une couleur");
    } else if (selectedQuantity < 1 || selectedQuantity > 100) {
        alert("Merci de choisir une quantité entre 1 et 100");
    } else {
        alert("Votre article a bien été ajouté au panier")
    }
    console.log(addObject);

    // ----------------- LOCAL STORAGE -----------------//
    // Déclaration de la variable de stock des clés/valeurs du local storage + conversion JSON > JS
    let objectInLocalStorage = JSON.parse(localStorage.getItem("cartProduct"));
    // écoute du localstorage
    if (objectInLocalStorage) {
        // recherche d'un produit similaire à celui en passe d'être ajouté par l'utilisateur
        let item = objectInLocalStorage.find(
            (item) => item.id == addObject.id && item.color == addObject.color);

        // si produit déjà présent, Incrémentation de la quantité et mise à jour du produit
        if (item) {
            item.quantity = item.quantity + addObject.quantity;
            // item.totalPrice += item.price * addObject.quantity;
            localStorage.setItem("cartProduct", JSON.stringify(objectInLocalStorage));
            console.log("Ajout de(s) produit(s) supplémentaire(s)");
            return;
        }
        // si pas de produit similaire, push des choix de l'utilisateur
        objectInLocalStorage.push(addObject);
        localStorage.setItem("cartProduct", JSON.stringify(objectInLocalStorage));
        console.log("produit ajouté au panier");

    }
    //------- stock les choix de l'user dans le local storage-----//
    else {
        let pushObjectToLocalStorage = [];
        pushObjectToLocalStorage.push(addObject);
        localStorage.setItem("cartProduct", JSON.stringify(pushObjectToLocalStorage));
        console.log("Le panier est vide, on ajoute le 1er produit");

    }

});
