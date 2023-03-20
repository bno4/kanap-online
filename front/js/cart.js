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
  //Si un produit est dans le panier boucle for pour pacourir le localstorage
  let productsInCart = [];
  // for (i = 0; i < objectInLocalStorage.length; i++) 
  objectInLocalStorage.map(product => {
    console.log(objectInLocalStorage.length + `éléments dans le panier`);

    document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
          <img src="${product.image}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p>${product.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : ${product.quantity} </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;


  });
  console.log(productsInCart);


};

