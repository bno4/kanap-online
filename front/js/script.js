// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('http://localhost:3000/api/products');
const products = await reponse.json();




for (let i = 0; i < products.length; i++) {

    const article = products[i];


    const imageProduit = document.createElement("img");
    imageProduit.src = article.imageUrl;

}



// récupération de l'élément du DOM qui accueillera les fiches produits
const sectionItems = document.querySelector(".items")
sectionItems.appendChild(imageProduit);