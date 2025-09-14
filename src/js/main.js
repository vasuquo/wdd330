import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const ulElement = document.querySelector(".product-list");

const dataSource = new ProductData("tents");
const prouctList = new ProductList("tents", dataSource, ulElement);

prouctList.init();