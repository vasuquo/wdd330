import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const total = cartItems.reduce((accum, item) => accum + item.FinalPrice, 0);
  document.querySelector(".cart-container").innerHTML = htmlItems.join("");
  if (total > 0) {
      document.querySelector(".cart-footer").style.display = "block";
      document.querySelector(".cart-total").innerHTML = `Total: $${total.toFixed(2)}`;
  }     
  else
    document.querySelector(".cart-footer").style.display = "none";
}

function cartItemTemplate(item) {
  const newItem = `<div class="cart-list">
    <div class="cart-image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </div>
  <div class="cart-detail">
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</div></div>`;

  return newItem;
}

loadHeaderFooter();
renderCartContents();
