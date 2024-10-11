
import { buttonHtml } from "./constants.js";

export let generateCards = (data) => {
    const container = document.getElementById("dynamic-list");
    data.forEach((element) => {
      const card = document.createElement("div");
      card.className = "product-card";
      const image = document.createElement("img");
      image.className = "product-image";
      const category = document.createElement("p");
      category.className = "product-category";
      const name = document.createElement("p");
      name.className = "product-name";
      const price = document.createElement("p");
      price.className = "product-price";
      const addButton = document.createElement("button");
      addButton.className = "add-button";
      image.src = element.image.desktop;
      image.alt = element.name;
      addButton.innerHTML = buttonHtml;
  
      name.textContent = element.name;
      category.textContent = element.category;
      price.textContent = `$ ${element.price}`;
      card.appendChild(image);
      card.appendChild(addButton);
      card.appendChild(category);
      card.appendChild(name);
      card.appendChild(price);
      card.productData = element;
      container.appendChild(card);
    });
  };

  export let generateTotalPriceElement = () => {
    const cart = document.getElementById("total");
    const totalPrice = document.createElement("div");
    totalPrice.setAttribute("id", "total-price");
    const total = document.createElement("p");
    total.setAttribute("id", "total");
    const price = document.createElement("p");
    price.setAttribute("id", "price");
    total.textContent = "Total";
    price.textContent = "$ 0";
    totalPrice.appendChild(total);
    totalPrice.appendChild(price);
    cart.appendChild(totalPrice);
  
    let conformationButton = document.createElement("button");
    conformationButton.setAttribute("id", "conformation-button");
    conformationButton.textContent = "Conform Order";
    cart.appendChild(conformationButton);
  };


  export let generateCartItems = function (item) {
    const cart = document.getElementById("cart");
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    const counter = document.createElement("div");
    counter.className = "cart-item-counter";
    const name = document.createElement("p");
    name.className = "item-name";
    const price = document.createElement("p");
    price.className = "item-price";
    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
  
    counter.textContent = item.quantity;
    name.textContent = item.name;
    price.textContent = `$ ${item.price}`;
    removeButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg> 
      `;
    cartItem.appendChild(counter);
    cartItem.appendChild(name);
    cartItem.appendChild(price);
    cartItem.appendChild(removeButton);
    cartItem.productData = item;
    cart.appendChild(cartItem);
  };