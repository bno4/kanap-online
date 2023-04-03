// récupération et affichage de l'id saisie dans confirmation.html
const orderId = document.getElementById('orderId');
orderId.innerText = localStorage.getItem('orderId');
// suppresiosn du localStorage de l'orderId
localStorage.removeItem('orderId');


// Ancienne méthode qui vidait TOUT le localstorage. Pas recommandée si travaille en équipe
// localStorage.clear();


