// Déclaration de la variable de stock des clés/valeurs du local storage + conversion JSON > JS
let objectInLocalStorage = JSON.parse(window.localStorage.getItem("cartProduct"));
// écoute du localstorage
console.log(objectInLocalStorage);

// sélection de la classe ou j'affiche l'html
const cartState = document.querySelector('#cart__items');

if (objectInLocalStorage === null) {
  console.log("panier vide");
  const emptyCart = document.createElement('div');
  emptyCart.innerText = `Le panier est vide`;
  cartState.appendChild(emptyCart);

} else {
  //Si un produit est dans le panier boucle map pour pacourir le localstorage
  let productsInCart = [];
  // for (i = 0; i < objectInLocalStorage.length; i++) 
  objectInLocalStorage.map(product => {
    console.log(objectInLocalStorage.length + ` éléments dans le panier`);
    // création de la balise article et récupération des data du localstorage
    const articleCart = document.createElement("article");
    articleCart.className = 'cart__item';
    articleCart.dataset.id = product.id;
    articleCart.dataset.color = product.color;

    // création de la balise div avec img et récupération des data du localstorage
    const divImgCart = document.createElement("div")
    divImgCart.className = 'cart__item__img';
    const imgCart = document.createElement("img");
    imgCart.src = product.image;
    imgCart.alt = product.alt_image;

    // création du bloc nom, couleur, prix et récupération des data du localstorage
    const divContent = document.createElement("div")
    divContent.className = 'cart__item__content';
    const divContentDescription = document.createElement("div")
    divContentDescription.className = 'cart__item__content__description';
    const titleItem = document.createElement('h2');
    titleItem.innerText = product.name;
    const colorItem = document.createElement('p');
    colorItem.innerText = product.color;
    const priceItem = document.createElement('p');
    priceItem.innerText = `${product.price} €`;

    // création du bloc d'ajustement de la quantité de canapés
    const divContentSettings = document.createElement("div");
    divContentSettings.className = 'cart__item__content__settings';
    const divContentQty = document.createElement("div");
    divContentQty.className = 'cart__item__content__settings__quantity';
    const quantityItem = document.createElement('p');
    quantityItem.innerText = "Qté :";
    const setQuantity = document.createElement('input');
    setQuantity.setAttribute("type", "number");
    setQuantity.className = 'itemQuantity';
    setQuantity.min = 0;
    setQuantity.max = 100;
    setQuantity.value = product.quantity;
    const deleteDiv = document.createElement('div');
    deleteDiv.className = 'cart__item__content__settings__delete';
    const deleteButton = document.createElement('p');
    deleteButton.innerText = "Supprimer";

    // architecture HTML
    cartState.appendChild(articleCart);
    articleCart.appendChild(divImgCart);
    divImgCart.appendChild(imgCart);
    articleCart.appendChild(divContent);
    divContent.appendChild(divContentDescription);
    divContentDescription.append(titleItem, colorItem, priceItem);
    divContent.appendChild(divContentSettings);
    divContentSettings.appendChild(divContentQty);
    divContentQty.append(quantityItem, setQuantity);
    divContentSettings.appendChild(deleteDiv);
    deleteDiv.appendChild(deleteButton);
  });
};

// let inputs = document.querySelector('.itemQuantity');
// inputs.addEventListener("change", (event) => {
//   event.preventDefault();
//   inputs.map(input => {
//     input.addEventListener("change", (e) => {
//       let selectedQuantity = e.target.value;
//       if (selectedQuantity == 0 || selectedQuantity >= 100) {
//         console.error("Merci de choisir une quantité entre 1 et 100");
//         selectedQuantity = product.quantity;
//       } 
//   })

// });

