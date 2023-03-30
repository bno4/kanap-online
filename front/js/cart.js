// Déclaration de la variable de stock des clés/valeurs du local storage + conversion JSON > JS
let objectInLocalStorage = JSON.parse(localStorage.getItem("cartProduct"));
// écoute du localstorage
console.log(objectInLocalStorage);

//-----------------------------------------------------------------
// sélection de la classe ou j'affiche l'html
const cartState = document.querySelector('#cart__items');

if (objectInLocalStorage === null || objectInLocalStorage === 0) {
  console.log("panier vide");
  const emptyCart = document.createElement('h2');
  emptyCart.innerHtml = `Le panier est vide`;
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
    // récupération du prix du produit depuis l'API
    let object = "";
    fetch("http://localhost:3000/api/products/" + product.id)
      .then(res => res.json())
      .then(function (showApi) {
        object = showApi;
        const priceItem = document.createElement('p');
        priceItem.innerText = `${object.price} €`;
        divContentDescription.appendChild(priceItem);
      })
      .catch(error => alert("Erreur : " + error));


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
    divContentDescription.append(titleItem, colorItem);
    divContent.appendChild(divContentSettings);
    divContentSettings.appendChild(divContentQty);
    divContentQty.append(quantityItem, setQuantity);
    divContentSettings.appendChild(deleteDiv);
    deleteDiv.appendChild(deleteButton);
  });
};

//-----------------------------------------------------------------
// Fonction d'affichage de la quantité totale de produits dans le panier
let totalQuantity = document.getElementById('totalQuantity')
function totalQuantityInCart() {
  let quantitySum = 0;
  if (objectInLocalStorage.length == 0 || objectInLocalStorage === null) {
    totalQuantity.innerText = "0";

  } else {
    for (let quantityProductsInCart of objectInLocalStorage) {
      let quantityProducts = quantityProductsInCart.quantity;
      let quantityTotal = parseInt(quantityProducts);
      quantitySum += quantityTotal;
      totalQuantity.innerText = quantitySum;
    }
  }
<<<<<<< HEAD
  console.log(quantitySum + ` = nb total de canapés dans le panier`);
=======
  console.log(quantitySum + ` = nbre de produits dans le panier`);
>>>>>>> dev
};
totalQuantityInCart();

// Récupération de produit dans l'API via son id 
async function getProduct(id) {
  return fetch("http://localhost:3000/api/products/" + id)
    .then(response => response.json())
    .catch(error => alert("Erreur : " + error));
}
//-----------------------------------------------------------------
// Fonction d'affichage du prix total du panier
let totalPrice = document.getElementById('totalPrice');
function totalPriceInCart() {
  let priceSum = 0;
  if (objectInLocalStorage.length === 0) {
    const emptyCart = document.createElement('h2');
    emptyCart.innerText = `Le panier est vide`;
    cartState.appendChild(emptyCart);
    totalPrice.innerText = "0";

  } else {
    for (let sofa of objectInLocalStorage) {
      let index = "";
      fetch("http://localhost:3000/api/products/" + sofa.id)
        .then(res => res.json())
        .then(function (showRes) {
          index = showRes;
          let productsPrice = index.price;
          // let priceItems = parseInt(productsPrice);
          priceSum += (productsPrice * sofa.quantity);
          totalPrice.innerText = priceSum;
        })
        .catch(error => alert("Erreur : " + error));
    }
  }
  console.log(priceSum);
};
totalPriceInCart();

//-----------------------------------------------------------------
// function de modification de quantité
// function modifQuantity() {
let quantityModify = document.querySelectorAll(".itemQuantity")
for (let i = 0; i < quantityModify.length; i++) {
  quantityModify[i].addEventListener("change", (event) => {
    event.preventDefault();
    let productQuantity = event.target.value;
    if (productQuantity == 0 || productQuantity >= 100) {
      console.error("La quantité doit être comprise entre 1 et 100")
      alert("La quantité doit être comprise entre 1 et 100")
      location.reload();
      productQuantity = `${objectInLocalStorage[i].quantity}`;
    } else {
      objectInLocalStorage.map((obj) => {
        if ((obj.id == objectInLocalStorage[i].id, obj.color == objectInLocalStorage[i].color)) {
          obj.quantity = parseInt(productQuantity);
        }
      });
    }
    console.log(productQuantity + ` nouvelle quantité du prod sélectionné`);
    localStorage.setItem("cartProduct", JSON.stringify(objectInLocalStorage));
    totalPriceInCart();
    totalQuantityInCart();
  });
}
//-----------------------------------------------------------------
// function de suppression d'un produit
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

//-----------------------Le formulaire -----------------------//
function postForm() {
  // sélection du bouton "commander"
  const buttonSubmit = document.getElementById('order');
  // sélection des paragraphes messages d'erreur
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  const emailErrorMsg = document.getElementById("emailErrorMsg");

  // création des RegEx
  const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const regExFullNameCity = /^[a-zA-ZÀ-ÿ_-]{2,60}$/;
  const regExAddress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/;

  // Au clic, récupération des données du formulaire sous format objet
  buttonSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    let contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value
    };


    // Vérification des champs prénom, nom, adresse, ville et email
    function checkFirstname() {
      const firstNameOK = contact.firstName;
      if (regExFullNameCity.test(firstNameOK)) {
        firstNameErrorMsg.innerText = "";
        return true;
      } else {
        firstNameErrorMsg.innerText = "Format incorrect, merci de saisir uniquement des lettres";
      };
    };

    function checkLastName() {
      const lastNameOK = contact.lastName;
      if (regExFullNameCity.test(lastNameOK)) {
        return true;
      } else {
        lastNameErrorMsg.innerText = "Format incorrect, merci de saisir uniquement des lettres"
      };
    };

    function checkAddress() {
      const addressOK = contact.address;
      if (regExAddress.test(addressOK)) {
        return true;
      } else {
        addressErrorMsg.innerText = "Format incorrect, merci de saisir uniquement des caractères alphanumériques"
      };
    };

    function checkCity() {
      const cityOK = contact.city;
      if (regExFullNameCity.test(cityOK)) {
        return true;
      } else {
        cityErrorMsg.innerText = "Format incorrect, merci de saisir uniquement des lettres";
      };
    };

    function checkEmail() {
      const emailOK = contact.email;
      if (regExEmail.test(emailOK)) {
        return true;
      } else {
        emailErrorMsg.innerText = "Format incorrect, merci de saisir une adresse email valide";
      };
    };
    // function de validation de l'ensemble du formulaire
    function validForm() {
      if (objectInLocalStorage.length >= 1 && checkFirstname() && checkLastName() && checkAddress() && checkCity() && checkEmail()) {
        alert("commande confirmée !")
        localStorage.setItem("contact", JSON.stringify(contact))
        return true;

      }
      else {
        alert("Un champ est vide ou mal renseigné")
      }
    };
    validForm();


    // regroupement du panier sélectionné et donnée du formulaire dans un objet
    const commandToLocalStorage = {
      objectInLocalStorage,
      contact,
    };
    console.log(commandToLocalStorage)
    // Envoi de l'objet formulaire et panier dans le serveur
    const opts = {
      method: 'POST',
      body: JSON.stringify(commandToLocalStorage),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    fetch("http://localhost:3000/api/products/order", opts)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('orderId', data.orderId);
        if (validForm()) {
          document.location.href = 'confirmation.html?id=' + data.orderId;
        }
      });


  });
}
postForm();
