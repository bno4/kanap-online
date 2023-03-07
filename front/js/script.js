// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('http://localhost:3000/api/products');
const products = await reponse.json();




for (let i = 0; i < products.length; i++) {

    const article = products[i];


    const imageProduct = document.createElement("img");
    imageProduct.src = article.imageUrl;
    const nameProduct = document.createElement("h3");
    nameProduct.innerText = article.name;
    const descriptionProduct = article.description("p")

}



// récupération de l'élément du DOM qui accueillera les fiches produits
const sectionItems = document.querySelector("#items")
sectionItems.appendChild(imageProduct);
sectionItems.appendChild(nameProduct);
sectionItems.appendChild(descriptionProduct);