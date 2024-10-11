"use strict";

import { setMapWrapper } from "./scripts/set-methode-wrapper.js";
import {
  buttonHtml,
  addedButtonHtml,
  emptyCArtElements,
} from "./scripts/constants.js";
import {
  generateCards,
  generateTotalPriceElement,
  generateCartItems,
} from "./scripts/generate-elements.js";

let data;
let totalCartItemsCount = 0;
let totalPrice;
let productQUantity = 1;
let cartItems = new Map();

if (cartItems.size === 0) {
  document.getElementById("cart-list").innerHTML = emptyCArtElements;
}

document.getElementById("total-cart-count").textContent = totalCartItemsCount;

let addingAddToCartEvent = async () => {
  const container = document.getElementById("dynamic-list");

  container.addEventListener("click", (event) => {
    if (!event.target.closest(".added")) {
      if (event.target.closest(".add-button")) {
        const card = event.target.closest(".product-card");

        if (!cartItems.has(card.productData.name)) {
          card.productData.quantity = 1;
          let totalPrice = setMapWrapper(
            cartItems,
            card.productData.name,
            card.productData
          );
          changingCartStyleAndFill(card.productData);

          event.target.closest(".add-button").classList.add("added");
          event.target.closest(".add-button").innerHTML = addedButtonHtml;
          document.getElementById("price").textContent = `$ ${totalPrice}`;
        } else {
          let item = cartItems.get(card.productData.name);
          item.quantity++;
          setMapWrapper(cartItems, card.productData.name, item);

          let itemsCounter =
            document.getElementsByClassName("cart-item-counter");

          Array.from(itemsCounter).forEach((counter) => {
            if (
              counter.parentElement.productData.name === card.productData.name
            ) {
              counter.textContent = item.quantity;
            }
          });
        }

        totalCartItemsCount++;
        document.getElementById("total-cart-count").textContent =
          totalCartItemsCount;
      }
    } else {
      if (event.target.closest(".incremant")) {
        incremantEvent(event);
      }

      if (event.target.closest(".dicremant")) {
        decremantEvent(event);
      }
    }
  });
};

let fetchingData = async () => {
  try {
    let response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error("No data");
    }

    let json = await response.json();
    data = json;
    await generateCards(data);
    addingAddToCartEvent();
    addingRemovingItemFromCartEvent();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

fetchingData();

let changingCartStyleAndFill = function (itemData) {
  if (cartItems.size > 0) {
    document.getElementById("cart-list").innerHTML = "";

    if (cartItems.has(itemData.name)) {
      generateCartItems(itemData);
    }

    if (cartItems.size === 1) {
      generateTotalPriceElement();
    }
  }
};

let addingRemovingItemFromCartEvent = function () {
  const cart = document.getElementById("cart");

  cart.addEventListener("click", (event) => {
    if (event.target.closest(".remove-button")) {
      const card = event.target.closest(".cart-item");

      if (
        cartItems.has(card.productData.name) &&
        cartItems.get(card.productData.name).quantity > 1
      ) {
        let item = cartItems.get(card.productData.name);
        item.quantity--;
        let totalPrice = setMapWrapper(cartItems, card.productData.name, item);
        document.getElementById("price").textContent = `$ ${totalPrice}`;

        let itemsCounter = document.getElementsByClassName("cart-item-counter");

        Array.from(itemsCounter).forEach((counter) => {
          if (
            counter.parentElement.productData.name === card.productData.name
          ) {
            counter.textContent = item.quantity;
          }
        });

        Array.from(
          document.getElementsByClassName("singleProductCount")
        ).forEach((item) => {
          if (
            item.closest(".product-card").productData.name ===
            card.productData.name
          ) {
            item.textContent = item.textContent - 1;
          }
        });

        totalCartItemsCount--;
        document.getElementById("total-cart-count").textContent =
          totalCartItemsCount;
      } else {
        totalCartItemsCount--;
        document.getElementById("total-cart-count").textContent =
          totalCartItemsCount;

        Array.from(document.getElementsByClassName("add-button")).forEach(
          (item) => {
            if (
              item.closest(".product-card").productData.name ===
              card.productData.name
            ) {
              item
                .closest(".product-card")
                .querySelector(".add-button")
                .classList.remove("added");
              item
                .closest(".product-card")
                .querySelector(".add-button").innerHTML = buttonHtml;
            }
          }
        );

        cartItems.delete(card.productData.name);
        let totalPrice = setMapWrapper(cartItems);
        document.getElementById("price").textContent = `$ ${totalPrice}`;
        card.remove();

        if (cartItems.size === 0) {
          document.getElementById("cart-list").innerHTML = emptyCArtElements;
          document.getElementById("total").innerHTML = "";
        }

        Array.from(
          document.getElementsByClassName("singleProductCount")
        ).forEach((item) => {
          if (
            item.closest(".product-card").productData.name ===
            card.productData.name
          ) {
            item.textContent = item.textContent - 1;
          }
        });
      }
    }
  });
};

let incremantEvent = function (event) {
  const card = event.target.closest(".product-card");
  let item = cartItems.get(card.productData.name);

  item.quantity++;
  let totalPrice = setMapWrapper(cartItems, card.productData.name, item);

  let itemsCounter = document.getElementsByClassName("cart-item-counter");

  Array.from(itemsCounter).forEach((counter) => {
    if (counter.parentElement.productData.name === card.productData.name) {
      counter.textContent = item.quantity;
    }
  });

  event.target
    .closest(".product-card")
    .querySelector(".singleProductCount").textContent = item.quantity;

  totalCartItemsCount++;
  document.getElementById("total-cart-count").textContent = totalCartItemsCount;
  document.getElementById("price").textContent = `$ ${totalPrice}`;
};

let decremantEvent = function (event) {
  const card = event.target.closest(".product-card");
  let item = cartItems.get(card.productData.name);

  if (item.quantity === 1 && cartItems.size > 1) {
    console.log("still items");

    totalCartItemsCount--;
    document.getElementById("total-cart-count").textContent =
      totalCartItemsCount;

    Array.from(document.getElementsByClassName("cart-item")).forEach((item) => {
      if (item.productData.name === card.productData.name) {
        item.remove();
        cartItems.delete(card.productData.name);
        let totalPrice = setMapWrapper(cartItems);
        document.getElementById("price").textContent = `$ ${totalPrice}`;

        card.querySelector(".add-button").classList.remove("added");
        card.querySelector(".add-button").innerHTML = buttonHtml;
      }

      if (cartItems.size === 0) {
        document.getElementById("cart-list").innerHTML = emptyCArtElements;
        document.getElementById("total").innerHTML = "";
      }
    });

    return;
  }

  if (item.quantity === 1) {
    console.log("last item");

    totalCartItemsCount--;
    document.getElementById("total-cart-count").textContent =
      totalCartItemsCount;

    Array.from(document.getElementsByClassName("cart-item")).forEach((item) => {
      if (item.productData.name === card.productData.name) {
        item.remove();
        cartItems.delete(card.productData.name);
        let totalPrice = setMapWrapper(cartItems);
        document.getElementById("price").textContent = `$ ${totalPrice}`;

        card.querySelector(".add-button").classList.remove("added");
        card.querySelector(".add-button").innerHTML = buttonHtml;
      }

      if (cartItems.size === 0) {
        document.getElementById("cart-list").innerHTML = emptyCArtElements;
        document.getElementById("total").innerHTML = "";
      }
    });

    return;
  }

  if (item.quantity > 1) {
    item.quantity--;
    let totalPrice = setMapWrapper(cartItems, card.productData.name, item);

    let itemsCounter = document.getElementsByClassName("cart-item-counter");

    Array.from(itemsCounter).forEach((counter) => {
      if (counter.parentElement.productData.name === card.productData.name) {
        counter.textContent = item.quantity;
      }
    });

    event.target
      .closest(".product-card")
      .querySelector(".singleProductCount").textContent = item.quantity;

    totalCartItemsCount--;
    document.getElementById("total-cart-count").textContent =
      totalCartItemsCount;
    document.getElementById("price").textContent = `$ ${totalPrice}`;
  }
};

let confirmaingOrderEvent = function () {
  const cart = document.getElementById("total");

  cart.addEventListener("click", (event) => {
    if (event.target.closest("#conformation-button")) {
      let totalPrice = setMapWrapper(cartItems);
      console.log(`Your order is confirmed : total price $ ${totalPrice}`);
    }
  });
};

confirmaingOrderEvent();