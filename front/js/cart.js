// Déclaration de la variable de stock des clés/valeurs du local storage + conversion JSON > JS
let objectInLocalStorage = JSON.parse(localStorage.getItem("cartProduct"));
// écoute du localstorage
console.log(objectInLocalStorage);

//-----------------------------------------------------------------
// sélection de la classe ou j'affiche l'html
const cartState = document.querySelector('#cart__items');

if (objectInLocalStorage === null || objectInLocalStorage === 0) {
  console.log("panier vide");
  const emptyCart = document.createElement('div');
  emptyCart.innerText = `Le panier est vide`;
  cartState.appendChild(emptyCart);

} else {
  //Si un produit est dans le panier, boucle map pour pacourir le localstorage
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
    deleteButton.className = 'deleteItem'
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
  const deleteItem = document.querySelectorAll('.deleteItem');
  deleteItem.forEach((item) => {
    const itemTarget = item.closest("article");
    const itemId = itemTarget.dataset.id;
    const articleTarget = itemTarget;
    const itemColor = itemTarget.dataset.color;
    // écoute du clik sur le bouton cible
    item.addEventListener("click", (event) => {
      event.preventDefault();
      objectInLocalStorage.map((product) => {
        if (product.id == itemId && product.color == itemColor) {
          // récupération de l'ID du produit cible
          let index = objectInLocalStorage.indexOf(product); // récupération de l'index du produit cible
          objectInLocalStorage.splice(index, 1);
          articleTarget.remove()
          localStorage.setItem("cartProduct", JSON.stringify(objectInLocalStorage));
          //Alerte produit supprimé et refresh
          alert("Ce produit a bien été supprimé du panier");
        }
      })
      totalQuantityInCart();
      totalPriceInCart();

    });


  });
};

//-----------------------------------------------------------------
// Fonction d'affichage de la quantité globale de produits dans le panier
let totalQuantity = document.getElementById('totalQuantity')
function totalQuantityInCart() {
  let quantitySum = 0;
  if (objectInLocalStorage.length === 0) {
    totalQuantity.innerText = "0";
  } else {
    for (let quantityProductsInCart of objectInLocalStorage) {
      let quantityProducts = quantityProductsInCart.quantity;
      let quantityTotal = parseInt(quantityProducts);
      quantitySum += quantityTotal;
      totalQuantity.innerText = quantitySum;
    }
  }
  console.log(quantitySum);
};
totalQuantityInCart();

//-----------------------------------------------------------------
// Fonction d'affichage du prix total du panier
let totalPrice = document.getElementById('totalPrice');
function totalPriceInCart() {
  let priceSum = 0;
  if (objectInLocalStorage.length === 0) {
    totalPrice.innerText = "0";

  } else {
    for (let priceProduct of objectInLocalStorage) {
      let productsPrice = priceProduct.price;
      let priceItems = parseInt(productsPrice);
      priceSum += (priceItems * priceProduct.quantity);
      totalPrice.innerText = priceSum;
    }
  }
  console.log(priceSum);
};
totalPriceInCart();

//-----------------------------------------------------------------
// function de modification de quantité
function modifQuantity() {
  let quantityModify = document.querySelectorAll(".itemQuantity")
  for (let i = 0; i < quantityModify.length; i++) {
    quantityModify[i].addEventListener("change", (event) => {
      event.preventDefault();

      //sélection de l'élément à modifier
      let quantityToModif = objectInLocalStorage[i].quantity;
      let quantityModifValue = quantityModify[i].valueAsNumber;

      const resultFind = objectInLocalStorage.find((element) => element.quantityModifValue !== quantityToModif)

      resultFind.quantity = quantityModifValue;
      objectInLocalStorage[i].quantity = resultFind.quantity;

      localStorage.setItem("cartProduct", JSON.stringify(objectInLocalStorage));
      totalPriceInCart();
      totalQuantityInCart();
    });

  }
  console.log(quantityModify);
};
modifQuantity()
totalPriceInCart();
totalQuantityInCart();


//-----------------------------------------------------------------
// function de suppression d'un produit
// const deleteItem = document.querySelectorAll('.deleteItem');
// deleteItem.forEach((item) => {
//   const itemTarget = item.closest("article");
//   const itemId = itemTarget.dataset.id;
//   const articleTarget = itemTarget;
//   const itemColor = itemTarget.dataset.color;
//   // écoute du clik sur le bouton cible
//   item.addEventListener("click", (event) => {
//     event.preventDefault();
//     objectInLocalStorage.map((product) => {
//       if (product.id == itemId && product.color == itemColor) {
//         // récupération de l'ID du produit cible
//         let index = objectInLocalStorage.indexOf(product); // récupération de l'index du produit cible
//         objectInLocalStorage.splice(index, 1);
//         articleTarget.remove()
//         localStorage.setItem("cartProduct", JSON.stringify(objectInLocalStorage));
//         //Alerte produit supprimé et refresh
//         alert("Ce produit a bien été supprimé du panier");


//       }
//     })

//   });
//   totalPriceInCart();
//   totalQuantityInCart();
//   console.log(deleteItem);

// });

//**************** ancien code qui marche moyen
// function deleteArticle() {
//   let deleteItem = document.querySelectorAll('.deleteItem');

//   for (let i = 0; i < deleteItem.length; i++) {
//     // !! Ajouter DOM "le panier est vide if objectinlocalstorage === 0"
//     deleteItem[i].addEventListener("click", (event) => {
//       event.preventDefault();

//       // selection du produit par l'ID et la Couleur
//       let idToDelete = objectInLocalStorage[i].id;
//       let colorToDelete = objectInLocalStorage[i].color;

//       objectInLocalStorage = objectInLocalStorage.filter((el) => el.id !== idToDelete || el.color !== colorToDelete);

//       localStorage.setItem("cartProduct", JSON.stringify(objectInLocalStorage));
//       //Alerte produit supprimé et refresh
//       alert("Ce produit a bien été supprimé du panier");
//       window.location.reload();
//     })



//   }
//   console.log(deleteItem);
// };
// deleteArticle();
//****************************************************** */ 

//--------------------------------------------------------------
// Le formulaire
const buttonSubmit = document.getElementById('order');

// récupération des données du formulaire
buttonSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value
  }

  // functions de validation des champs firstname, lastname, adresse, ville, email





  console.log(contact);
  localStorage.setItem("contact", JSON.stringify(contact));

  const commandToLocalStorage = {
    objectInLocalStorage,
    contact
  }
  console.log(commandToLocalStorage);
});



