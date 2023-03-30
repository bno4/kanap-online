// récupération et affichage de l'id saisie dans confirmation.html
const orderId = document.getElementById('orderId');
orderId.innerText = localStorage.getItem('orderId');
localStorage.clear();


