// Récupération des pièces depuis le fichier JSON
fetch("http://localhost:3000/api/products")
    .then(response => response.json());




for (let i = 0; i < products.length; i++) {

    const article = products[i];

    const imageProduct = document.createElement("img");
    imageProduct.src = article.imageUrl;
    const nameProduct = document.createElement("h3");
    nameProduct.innerText = article.name;
    const descriptionProduct = article.description("p");
    descriptionProduct.innerText = article.description;

}


const sectionItems = document.querySelector(".items");
const articleProduct = document.createElement("article");
// récupération de l'élément du DOM qui accueillera les fiches produits
sectionItems.appendChild(articleProduct);
articleProduct.appendChild(imageProduct);
articleProduct.appendChild(nameProduct);
articleProduct.appendChild(descriptionProduct);