import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData('tents');

const productList = new ProductList('tent', dataSource, 'listElement');
productList.init();
