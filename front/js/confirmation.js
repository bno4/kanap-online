const searchParams = new URLSearchParams(window.location.search);
const idProduct = searchParams.get("id")
// récupération et affichage de l'id saisie dans confirmation.html
const orderId = document.getElementById('orderId');
orderId.innerText = idProduct;



