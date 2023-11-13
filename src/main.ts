
import { AllProducts,Product } from "./Product";

async function betoltes() {
  try {
    let eredmeny = await fetch('products.json');
    if (!eredmeny.ok) {
      throw new Error('Hiba történt a letöltés közben.');
    }
    let tartalom = await eredmeny.json() as AllProducts;
    return tartalom.products;
  } catch (error) {
    console.error('Hiba:');
    return [];
  }
}

async function mind() {
  let tomb = await betoltes();
  adatMegjelenites(tomb);
}
async function abcSorrend() {
  let tomb = await betoltes();
  const sortedProducts = [...tomb].sort((a, b) => a.title.localeCompare(b.title));
  adatMegjelenites(sortedProducts);
}
async function legdragabbElol() {
  let tomb = await betoltes();
  const sortedProducts = [...tomb].sort((a, b) => b.price - a.price);
  adatMegjelenites(sortedProducts);
}

async function leirasbanKereses() {
  const keresesInput = document.getElementById("kereses-input") as HTMLInputElement;
  let tomb = await betoltes();
  const searchResult = tomb.filter(
    (termek) => termek.description.toLowerCase().includes(keresesInput.value.toLowerCase())
  );
  adatMegjelenites(searchResult);
}

async function ajanlat() {
  let tomb = await betoltes();
  const affordableProducts = tomb.filter((termek) => termek.price < 100);
  const sortedAffordableProducts = [...affordableProducts].sort((a, b) => b.rating - a.rating);
  adatMegjelenites(sortedAffordableProducts);
}

function adatMegjelenites(termekLista: Product[]) {
  const listaElem = document.getElementById("product-list");

  if (listaElem) {
    while (listaElem.firstChild) {
      listaElem.removeChild(listaElem.firstChild);
    }
  }

  termekLista.forEach((termek) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <h3>${termek.title}</h3>
      <p>${termek.description}</p>
      <p>Ár: $${termek.price.toFixed(2)}</p>
      <p>Értékelés: ${termek.rating}</p>
      <p>Raktáron: ${termek.stock} db</p>
      <p>Márka: ${termek.brand}</p>
      <p>Kategória: ${termek.category}</p>
      <img src="${termek.thumbnail}" alt="${termek.title}" width="100" height="100">
       `;
    listaElem!.appendChild(listItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const mindButton = document.getElementById("mind-button");
  if (mindButton) {
    mindButton.addEventListener("click", mind);
  }
  const abcButton = document.getElementById("abc-button");
  if (abcButton) {
    abcButton.addEventListener("click", abcSorrend);
  }

  const legdragabbButton = document.getElementById("legdragabb-button");
  if (legdragabbButton) {
    legdragabbButton.addEventListener("click", legdragabbElol);
  }

  const keresesButton = document.getElementById("kereses-button");
  if (keresesButton) {
    keresesButton.addEventListener("click", leirasbanKereses);
  }

  const ajanlatButton = document.getElementById("ajanlat-button");
  if (ajanlatButton) {
    ajanlatButton.addEventListener("click", ajanlat);
  }
});

