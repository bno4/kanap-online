const sectionProducts = document.querySelector("#items")
console.log(sectionProducts)

const URL = "http://localhost:3000/api/products"

//---- création de la fonction qui affiche les pièces depuis l'API (source : https://developer.mozilla.org/en-US/docs/Web/API/Response/json) ----//

async function fetchData() {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // création des éléments enfants de la sectionProducts ("#items")
            for (const product of data) {
                const linkProduct = document.createElement("a")
                linkProduct.href = `./product.html?id=${product._id}`;
                const articleProduct = document.createElement("article");
                articleProduct.innerText;
                const imageProduct = document.createElement("img");
                imageProduct.src = product.imageUrl;
                imageProduct.alt = product.altTxt;
                const nameProduct = document.createElement("h3");
                nameProduct.innerText = product.name;
                const descriptionProduct = document.createElement("p");
                descriptionProduct.innerText = product.description;
                const priceProduct = document.createElement("p");
                priceProduct.innerText = `${product.price} €`;
                // architecture des éléments a > article > img > h3 > p
                sectionProducts.appendChild(linkProduct);
                linkProduct.appendChild(articleProduct);
                articleProduct.appendChild(imageProduct);
                articleProduct.appendChild(nameProduct);
                articleProduct.appendChild(descriptionProduct);
                articleProduct.appendChild(priceProduct);

            }
        }
        )
        .catch((error) => {
            console.error("Error:", error);
        });
}

// appel de la fonction qui affichera les éléments
fetchData()

