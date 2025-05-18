import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // the product details are needed before rendering the HTML
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        this.renderProductDetails();
//        document.getElementById('addToCart')
//          .addEventListener('click', this.addProductToCart.bind(this));
    }
    getId() {
        return this.product.Id;
    }
    getImage() {
        return this.product.Image;
    }
    getName() {
        return this.product.NameWithoutBrand;
    }
    getBrandName() {
        return this.product.Brand.Name;
    }
    getPrice() {
        return this.product.ListPrice;
    }
    getColor() {
        return this.product.Colors[0].ColorName;
    }
    getDescription() {
        return this.product.DescriptionHtmlSimple;
    }
    addProductToCart() {
        const cartItems = getLocalStorage('so-cart') || [];
        cartItems.push(this.product);
        setLocalStorage('so-cart', cartItems);
    }
    renderProductDetails() {     
        const productDetails = document.querySelector('.product-detail');   
        const brandName = document.createElement('h3');
        brandName.textContent = this.getBrandName();
        productDetails.appendChild(brandName);

        const productName = document.createElement('h2');
        productName.classList.add('divider');
        productName.textContent = this.getName();
        productDetails.appendChild(productName);

        const productImage = document.createElement('img');
        productImage.classList.add('divider');
        productImage.setAttribute('src', this.getImage());
        productImage.setAttribute('alt',this.getName());
        productDetails.appendChild(productImage);

        const productPrice = document.createElement('p');
        productPrice.classList.add('product-card__price');
        productPrice.textContent = `$${this.getPrice()}`;
        productDetails.appendChild(productPrice);

        const productColor = document.createElement('p');
        productColor.classList.add('product__color');
        productColor.textContent = this.getColor();
        productDetails.appendChild(productColor);

        const productDescription = document.createElement('p');
        productDescription.classList.add('product__description');        
        productDescription.innerHTML = this.getDescription();
        productDetails.appendChild(productDescription);

        const btnDiv = document.createElement('div');
        btnDiv.classList.add('product-detail__add');
        const productBtn = document.createElement('button');
        productBtn.id = 'addToCart';
        productBtn.textContent = 'Add to Cart';
        productBtn.dataset.id = this.getId();
        productBtn.addEventListener('click', this.addProductToCart.bind(this));
        btnDiv.appendChild(productBtn);        
        productDetails.appendChild(btnDiv);
    }
}