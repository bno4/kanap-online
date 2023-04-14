// Déclaration de la variable de stock clés/valeurs du local storage
let objectInLocalStorage = JSON.parse(localStorage.getItem("cartProduct"));
console.log(objectInLocalStorage);

// function autonome d'annonce de panier vide, avec effacement du formulaire
function showEmptyCart() {
  if (objectInLocalStorage == 0 || objectInLocalStorage === null) {
    const emptySection = document.querySelector(".cart");
    const emptyCart = document.querySelector("h1");
    emptyCart.innerText = `Votre panier est vide`;
    emptySection.style.display = "none";
  }
};

// Fetch de l'API pour récupérer le prix du produit
fetch('http://localhost:3000/api/products')
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(products => {

    if (objectInLocalStorage === null || objectInLocalStorage == 0) {
      showEmptyCart();
      console.log("panier vide");

    } else {
      // sélection de la section où est affiché l'html
      const cartState = document.querySelector('#cart__items');
      //Si un produit est dans le panier, boucle "map" pour pacourir le localstorage et afficher les produits précédemment sélectionnés
      objectInLocalStorage.map(product => {
        const productApi = products.find(prod => prod._id === product.id);

        console.log(objectInLocalStorage.length + ` canapés différents dans le panier`);

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

        // architecture du bloc HTML
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
        // Fonction d'affichage des totaux quantité et prix du panier
        function TotalQuantityPrice() {
          let totalQuantity = document.getElementById('totalQuantity')
          let quantitySum = 0;
          let totalPrice = document.getElementById('totalPrice');
          let priceSum = 0;

          if (objectInLocalStorage == 0 || objectInLocalStorage === null) {
            showEmptyCart();
            console.log('panier vide')

          } else {
            for (let sofa of objectInLocalStorage) {
              // appel du prix du produit depuis l'API dans cette boucle for
              const prodApi = products.find(prod => prod._id === sofa.id);
              // calcul de la quantité totale
              let quantityProducts = sofa.quantity;
              let quantityTotal = parseInt(quantityProducts);
              quantitySum += quantityTotal;
              totalQuantity.innerText = quantitySum;
              // calcul du prix total
              priceSum += (prodApi.price * sofa.quantity);
              totalPrice.innerText = priceSum;
            };
          };
          console.log(quantitySum + ` unités au total dans le panier`);
          console.log(priceSum + ' € prix total dans le panier');
        };
        TotalQuantityPrice();

        //-----------------------------------------------------------------
        // function de modification de quantité
        function quantityChange() {
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
              TotalQuantityPrice();
            });
          };
        };
        quantityChange();

        //-----------------------------------------------------------------
        // Fonction de suppression d'un produit

        const deleteItem = document.querySelectorAll('.deleteItem');
        deleteItem.forEach((item) => {
          const itemTarget = item.closest("article");
          const itemId = itemTarget.dataset.id;
          const articleTarget = itemTarget;
          const itemColor = itemTarget.dataset.color;
          // écoute du clik sur le bouton cible
          item.addEventListener("click", (event) => {
            event.preventDefault();
            objectInLocalStorage.map((sofa) => {
              if (sofa.id == itemId && sofa.color == itemColor) {
                // récupération de l'index du produit cible
                let index = objectInLocalStorage.indexOf(sofa);
                objectInLocalStorage.splice(index, 1);
                articleTarget.remove();

                //Alerte produit supprimé
                alert("Ce produit a été retiré du panier");
              };
            });
            localStorage.setItem("cartProduct", JSON.stringify(objectInLocalStorage));
            quantityChange();
            TotalQuantityPrice();
          });
        });
        // FIN de la function de suppression d'un produit
      });
    };
  });

/**------------------  LE FORMULAIRE  -----------------------*/
// sélection du formulaire
let form = document.querySelector(".cart__order__form");
// sélection du bouton "commander"
const buttonSubmit = document.getElementById('order');

// Création de l'objet contenat les messages d'erreurs
let errorMsgs = {
  firstNameErrorMsg: "Merci de ne saisir que des lettres et au moins 2 caractères",
  lastNameErrorMsg: "Merci de ne saisir que des lettres et au moins 1 caractère",
  addressErrorMsg: "Merci de ne saisir que des caractères alphanumériques et au moins 2 caractères",
  cityErrorMsg: "Merci de ne saisir que des lettres et au moins 2 caractères",
  emailErrorMsg: "Merci de saisir une adresse e-mail valide",
};

// création des RegEx
let regExps = {
  firstNameRegExp: /^[a-zA-ZÀ-ÿ _-]{2,60}$/,
  lastNameRegExp: /^[a-zA-ZÀ-ÿ _-]{1,60}$/,
  addressRegExp: /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/,
  cityRegExp: /^[a-zA-ZÀ-ÿ _-]{2,60}$/,
  emailRegExp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

// Crée un objet à remplir à partir des données saisies et validées
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};


// Vérification des champs prénom, nom, adresse, ville et email
function checkInput(input, errorMsg, inputValue) {
  let inputErrorMsgElt = document.getElementById(input.id + "ErrorMsg");
  errorMsg = input.id + "ErrorMsg";
  let inputRegExp = regExps[input.id + "RegExp"];
  let inputTest = inputRegExp.test(input.value); // Teste da valeur du champ par rapport à la RegExp correspondante
  inputValue = input.id;

  if (inputTest) { // si le test renvoie vrai, envoie la valeur saisie dans le formulaire à {contact}
    contact[`${inputValue}`] = input.value;
    inputErrorMsgElt.textContent = "";
  } else { // sinon, ajoute le message d'erreur
    inputErrorMsgElt.textContent = errorMsgs[errorMsg];
    contact[`${inputValue}`] = "";
  }
};

for (let input of form) { // Pour chaque input du formulaire,
  input.addEventListener("input", (e) => {
    e.preventDefault(); // Ajoute un ecouteur d'evenement au changement de la valeur 
    checkInput(input, errorMsgs.errorMsg, input.id); // Lance la fonction de verification de données saisies dans le formulaire de contact 
    console.log(contact);
  });
};

/**  Au clic sur le bouton "commander" : vérification du formulaire. 
Si OK appel de la fonction POST server pour récupérer l'orderID */
buttonSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  if (contact.firstName && contact.lastName && contact.address && contact.city && contact.email && objectInLocalStorage.length >= 0) {
    alert("commande confirmée !")
    // localStorage.setItem("contact", JSON.stringify(contact))
    PostServer();
  }
  else {
    alert("Un champ est vide ou mal renseigné, merci de renseigner tous les champs")
  };
  // Création de la function POST pour récpérer l'orderID
  function PostServer() {

    // regroupement des ID + couleur + quantité du panier sélectionné et données du formulaire dans un objet
    let products = [];
    // 2e tableau avec les détails car le back n'accepte QUE l'id dans l'array Products (Renvoie par le serveur d'une erreur 500)
    let commandDetails = [];
    objectInLocalStorage.map((product) => {
      products.push(product.id)

      let addCmd = {
        id: product.id,
        color: product.color,
        quantity: product.quantity,
      };
      commandDetails.push(addCmd);
    });
    // Regroupement des infos dans un objet global regroupant l'ID Produit, le détail de la commande (couleurs et quantités choises)
    const commandToLocalStorage = {
      products,
      commandDetails,
      contact,
    };
    console.log("RÉCAP DE LA COMMANDE");
    console.table(commandDetails);
    console.table(contact);

    // Envoi de l'objet formulaire et panier dans le serveur

    const opts = {
      method: 'POST',
      body: JSON.stringify(commandToLocalStorage),
      headers: {
        'Content-Type': 'application/json',
      }
    };
    // récupération du numéro de commande et redirection vers la page confirmation
    fetch("http://localhost:3000/api/products/order", opts)
      .then(response => response.json())
      .then(data => {
        document.location.href = 'confirmation.html?id=' + data.orderId;
      });
  };
});









//** ANCIENNEs LIGNEs DE CODE */
// sélection des inputs
// let inputFirstName = document.getElementById("firstName");
// let inputLastName = document.getElementById("lastName");
// let inputAddress = document.getElementById("address");
// let inputCity = document.getElementById("city");
// let inputEmail = document.getElementById("email");


// SIMPLIFICATION DU CODE AVEC UNE SEULE FONCTION POUR LE CALCUL DU PRIX ET DE LA QUANTITE PANIER
// ANCIEN CODE DE LA FUCNTION CALCUL DU PRIX CI-DESSOUS
        // Fonction d'affichage du Prix total du panier
        // let totalPrice = document.getElementById('totalPrice');
        // function totalPriceInCart() {
        //   let priceSum = 0;
        //   if (objectInLocalStorage === null || objectInLocalStorage == 0) {
        //     // totalPrice.innerText = "0";

        //   } else {
        //     for (let sofa of objectInLocalStorage) {
        //       const produitApi = products.find(prod => prod._id === sofa.id);
        //       // let productsPrice = produitApi.price;
        //       // let priceItems = parseInt(productsPrice);
        //       priceSum += (produitApi.price * sofa.quantity);
        //       totalPrice.innerText = priceSum;
        //       console.log(priceSum + ' € prix total');
        //     }
        //   }
        // };
        // totalPriceInCart();
