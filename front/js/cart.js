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

        // récupération du prix du produit depuis l'API
        let object = "";
        fetch("http://localhost:3000/api/products/" + product.id)
          .then(res => res.json())
          .then(function (showApi) {
            object = showApi;
            const priceItem = document.createElement('p');
            priceItem.innerText = `${productApi.price} €`;
            divContentDescription.appendChild(priceItem);
          })
          .catch(error => alert("Erreur : " + error));

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
        divContentDescription.append(titleItem, colorItem);
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
          if (objectInLocalStorage == null || objectInLocalStorage == 0) {
            // totalPrice.innerText = "0";

          } else {
            for (let sofa of objectInLocalStorage) {

              let productsPrice = productApi.price;
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
            // mise à jour des totaux Prix et Quantité
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
                //Alerte produit supprimé
                alert("Ce produit a bien été supprimé du panier");
              };
            });
            totalQuantityInCart();
            totalPriceInCart();
          });
        });

      })
    };
  });

//------------------  Le formulaire  -----------------------//

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
  // !!! checkINput cibléer le "p"
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

  if (objectInLocalStorage.length >= 1 && checkFirstname() && checkLastName() && checkAddress() && checkCity() && checkEmail()) {
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
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html?id=' + data.orderId;
      });
  };
});