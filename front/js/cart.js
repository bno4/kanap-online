// Déclaration de la variable de stock clés/valeurs du local storage
let objectInLocalStorage = JSON.parse(localStorage.getItem("cartProduct"));
console.log(objectInLocalStorage);

// function autonome d'annonce de panier vide, avec effacement du formulaire
function paniervide() {
  if (objectInLocalStorage == 0 || objectInLocalStorage === null) {
    const emptySection = document.querySelector(".cart");
    const emptyCart = document.querySelector("h1");
    emptyCart.innerText = `Votre panier est vide`;
    emptySection.style.display = "none";
  }
};
// GET PRODUCT DATAS FROM API BY ID TO GET ITS PRICE
fetch('http://localhost:3000/api/products')
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(products => {
    // sélection de la section où est affiché l'html
    if (objectInLocalStorage === null || objectInLocalStorage == 0) {
      paniervide();
      console.log("panier vide");

    } else {
      const cartState = document.querySelector('#cart__items');
      //Si un produit est dans le panier, boucle "map" pour pacourir le localstorage
      objectInLocalStorage.map(product => {
        const productApi = products.find(prod => prod._id === product.id);

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
        priceItem.innerText = `${productApi.price} €`;

        // création du bloc de modification de la quantité des canapés
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
        divContentDescription.append(titleItem, priceItem, colorItem);
        divContent.appendChild(divContentSettings);
        divContentSettings.appendChild(divContentQty);
        divContentQty.append(quantityItem, setQuantity);
        divContentSettings.appendChild(deleteDiv);
        deleteDiv.appendChild(deleteButton);

        //-------------------------------------------------------
        // Fonction d'affichage de la quantité totale de produits
        function totalQuantityInCart() {
          let totalQuantity = document.getElementById('totalQuantity')
          let quantitySum = 0;
          if (objectInLocalStorage == 0 || objectInLocalStorage === null) {
            paniervide();
            console.log('panier vide')
            // totalQuantity.innerText = "0";

          } else {
            for (let quantityProductsInCart of objectInLocalStorage) {
              let quantityProducts = quantityProductsInCart.quantity;
              let quantityTotal = parseInt(quantityProducts);
              quantitySum += quantityTotal;
              totalQuantity.innerText = quantitySum;
            }
          }
          console.log(quantitySum + ` = nbre de produits dans le panier`);
        };
        totalQuantityInCart();

        // --------------------------------------------
        // Fonction d'affichage du Prix total du panier
        let totalPrice = document.getElementById('totalPrice');
        function totalPriceInCart() {
          let priceSum = 0;
          if (objectInLocalStorage === null || objectInLocalStorage == 0) {
            // totalPrice.innerText = "0";

          } else {
            for (let sofa of objectInLocalStorage) {
              const produitApi = products.find(prod => prod._id === sofa.id);

              let productsPrice = produitApi.price;
              // let priceItems = parseInt(productsPrice);
              priceSum += (productsPrice * sofa.quantity);
              totalPrice.innerText = priceSum;
              console.log(priceSum + ' € prix total');
            }
          }
        };
        totalPriceInCart();

        //-----------------------------------------------------------------
        // function de modification de quantité
        function modify() {
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
                objectInLocalStorage.forEach((obj) => {
                  if ((obj.id == objectInLocalStorage[i].id, obj.color == objectInLocalStorage[i].color)) {
                    obj.quantity = parseInt(productQuantity);
                  }
                  console.log(objectInLocalStorage[i]);
                });
              }
              console.log(productQuantity + ` nouvelle quantité du prod sélectionné`);
              localStorage.setItem("cartProduct", JSON.stringify(objectInLocalStorage));
              // mise à jour des totaux Prix et Quantité
              totalPriceInCart();
              totalQuantityInCart();
            });
          };
        };
        modify();

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
            objectInLocalStorage.map((pouf) => {
              if (pouf.id == itemId && pouf.color == itemColor) {
                // récupération de l'ID du produit cible
                let index = objectInLocalStorage.indexOf(pouf); // récupération de l'index du produit cible
                objectInLocalStorage.splice(index, 1);
                articleTarget.remove();

                //Alerte produit supprimé
                alert("Ce produit a bien été supprimé du panier");
              };
            });
            localStorage.setItem("cartProduct", JSON.stringify(objectInLocalStorage));
            modify();
            totalQuantityInCart();
            totalPriceInCart();
          });
        });

      });
    };
  });

//------------------  Le formulaire  -----------------------//
// sélection du formulaire
let form = document.querySelector(".cart__order__form");
// sélection du bouton "commander"
const buttonSubmit = document.getElementById('order');
// sélection des paragraphes messages d'erreur
// const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
// const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
// const addressErrorMsg = document.getElementById("addressErrorMsg");
// const cityErrorMsg = document.getElementById("cityErrorMsg");
// const emailErrorMsg = document.getElementById("emailErrorMsg");

// sélection des inputs
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAddress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");
// Création de l'objet contenat les messages d'erreurs
let errorMsgs = {
  firstNameErrorMsg: "Veuillez entrer votre prenom en lettres",
  lastNameErrorMsg: "Veuillez entrer votre nom en lettres",
  addressErrorMsg: "Veuillez entrer votre adresse valide (ex: 3, rue de la mer)",
  cityErrorMsg: "Veuillez entrer votre ville (ex: 06000 Nice)",
  emailErrorMsg: "Veuillez entrer une adresse email valide (ex: votremail@gmail.com)",
};

// création des RegEx
let regExps = {
  firstNameRegExp: /^[a-zA-ZÀ-ÿ_-]{2,60}$/,
  lastNameRegExp: /^[a-zA-ZÀ-ÿ_-]{2,60}$/,
  addressRegExp: /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/,
  cityRegExp: /^[a-zA-ZÀ-ÿ_-]{2,60}$/,
  emailRegExp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

// Crée un objet à remplir à partir des données saisies et validées
let contact = {
  firstName: document.getElementById("firstName").value,
  lastName: document.getElementById("lastName").value,
  address: document.getElementById("address").value,
  city: document.getElementById("city").value,
  email: document.getElementById("email").value,
};
console.log(contact);


// Vérification des champs prénom, nom, adresse, ville et email
// !!! checkINput cibléer le "p"
function checkInput(input, errorMsg, contactProp) {
  let inputErrorMsgElt = document.getElementById(input.id + "ErrorMsg");
  errorMsg = input.id + "ErrorMsg";
  let inputRegExp = regExps[input.id + "RegExp"];
  let inputTest = inputRegExp.test(input.value); // Teste da valeur du champ par rapport à la RegExp correspondante
  contactProp = input.id;
  if (inputTest) { // si le test renvoie vrai, envoie la valeur saisie dans le formulaire à {contact}
    contact[`${contactProp}`] = input.value;
    inputErrorMsgElt.textContent = "";
  } else { // sinon, ajoute le message d'erreur
    inputErrorMsgElt.textContent = errorMsgs[errorMsg];
    contact[`${contactProp}`] = "";
  }
}
for (let input of form) { // Pour chaque input du formulaire,
  input.addEventListener("input", (e) => { // Ajoute un ecouteur d'evenement au changement de la valeur 
    checkInput(input, errorMsgs.errorMsg, input.id); // Lance la fonction de verification de données saisies dans le formulaire de contact 
    console.log(contact);
  });
};


// function de validation de l'ensemble du formulaire
// inputFirstName.addeveventlistener("input", (e) => {
//   e.preventDefault();
//   checkInput(firstname.value, regExFirstName, firstNameErrorMsg, firstNameErrorMsg)
// })
// checkInput(lastname.value, regExFullNameCity, "Format incorrect, merci de saisir uniquement des lettres", firstNameErrorMsg)
// checkInput(address.value, regExFullNameCity, "Format incorrect, merci de saisir uniquement des lettres", firstNameErrorMsg)
// Au clic, récupération des données du formulaire sous format objet
buttonSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(objectInLocalStorage.length);
  if (contact.firstName && contact.lastName && contact.address && contact.city && contact.email && objectInLocalStorage.length >= 0) {
    alert("commande confirmée !")
    // localStorage.setItem("contact", JSON.stringify(contact))
    PostServer();
  }
  else {
    alert("Un champ est vide ou mal renseigné")
  };

  function PostServer() {
    // regroupement des ID + couleur + quantité du panier sélectionné et données du formulaire dans un objet
    let products = [];
    let commandDetails = []; // 2e tableau avec les détails car le [] products n'accepte que l'id. Renvoie par le serveur d'une erreur 500
    objectInLocalStorage.map((product) => {
      products.push(product.id)

      let addCmd = {
        id: product.id,
        color: product.color,
        quantity: product.quantity,
      };
      commandDetails.push(addCmd);
    });
    // Regroupement des infos dans un object global
    const commandToLocalStorage = {
      products,
      commandDetails,
      contact,
    };
    // console.log(commandToLocalStorage.commandDetails)
    console.log("RÉCAP DE LA COMMANDE ENVOYÉE");
    console.table(commandToLocalStorage);

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

        document.location.href = 'confirmation.html?id=' + data.orderId;
      });
  };
});

// ANCIEN CODE FORMULAIRE
// function checkFirstname() {
//   const firstNameOK = contact.firstName;
//   if (regExFullNameCity.test(firstNameOK)) {
//     firstNameErrorMsg.innerText = "";
//     return true;
//   } else {
//     firstNameErrorMsg.innerText = "Format incorrect, merci de saisir uniquement des lettres";
//   };
// };

// function checkLastName() {
//   const lastNameOK = contact.lastName;
//   if (regExFullNameCity.test(lastNameOK)) {
//     return true;
//   } else {
//     lastNameErrorMsg.innerText = "Format incorrect, merci de saisir uniquement des lettres"
//   };
// };

// function checkAddress() {
//   const addressOK = contact.address;
//   if (regExAddress.test(addressOK)) {
//     return true;
//   } else {
//     addressErrorMsg.innerText = "Format incorrect, merci de saisir uniquement des caractères alphanumériques"
//   };
// };

// function checkCity() {
//   const cityOK = contact.city;
//   if (regExFullNameCity.test(cityOK)) {
//     return true;
//   } else {
//     cityErrorMsg.innerText = "Format incorrect, merci de saisir uniquement des lettres";
//   };
// };

// function checkEmail() {
//   const emailOK = contact.email;
//   if (regExEmail.test(emailOK)) {
//     return true;
//   } else {
//     emailErrorMsg.innerText = "Format incorrect, merci de saisir une adresse email valide";
//   };
// };