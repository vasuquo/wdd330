import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const cartItems = getLocalStorage("so-cart");
const ulElement = document.querySelector(".product-list");
loadHeaderFooter();
const shoppingCart = new ShoppingCart(cartItems, ulElement);
shoppingCart.init();
