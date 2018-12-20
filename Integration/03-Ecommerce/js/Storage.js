const Storage = {
    quantityProductRemove: 0,
    /**
     * Manage insert or update of product in localstorage
     * @param {Object} product
     * @param {Boolean} addQuantity
     */
    addProductInStorage: function (product, addQuantity = true) {
        let cart = (Storage.getUserCart()) ? Storage.getUserCart() : {};
        if (Storage.hasData()) {
            if (Storage.checkIfProductIsInCart(cart.products, product)) {
                cart.products = (addQuantity) ? Storage.addQuantityOnProductInStorage(cart.products, product) : Storage.removeQuantityOnProductInStorage(cart.products, product);
            } else {
                cart.products = Storage.addNewProductInStorage(cart.products, product)
            }
        } else {
            cart.products = Storage.addFirstProductInStorage(product)
        }
        cart.total = Storage.setTotalCart(cart.products);
        Storage.setUserCart(cart, {isForCreate: true});
    },
    /**
     * Insert first product in localStorage
     * @param  {Object} product
     * @return {Array}
     */
    addFirstProductInStorage: function (product) {
        product.quantity = Number(product.quantity)
        return [product];
    },
    /**
     * Insert new product in localstorage
     * @param  {Array} cart
     * @param  {Object} product
     * @return {Array}
     */
    addNewProductInStorage: function (cart, product) {
        cart.push(product);
        return cart;
    },
    /**
     * Update and remove quantity of product in localstorage
     * @param  {Array} cart
     * @param  {Object} product
     * @return {Array}
     */
    removeQuantityOnProductInStorage: function (cart, product) {
        cart.forEach((elemCart) => {
            if (product.productId === elemCart.productId) {
                if (Number(elemCart.quantity) > Number(product.quantity)) {
                    Storage.quantityProductRemove = Number(elemCart.quantity) - Number(product.quantity);
                    elemCart.quantity = Number(product.quantity);
                }
            }
        });
        return cart;
    },
    /**
     * Update and add quantity of product in localstorage
     * @param  {Array} cart
     * @param  {Object} product
     * @return {Array}
     */
    addQuantityOnProductInStorage: function (cart, product) {
        cart.forEach((elemCart) => {
            if (elemCart.productId === product.productId) {
                elemCart.quantity = Number(elemCart.quantity) + Number(product.quantity);
            }
        });
        return cart;
    },
    /**
     * Check if product select is in localStorage
     * @param  {Array} cart
     * @param  {Object} product
     * @return {Boolean}
     */
    checkIfProductIsInCart: function (cart, product) {
        let isInCart = false;
        cart.forEach((elemCart) => {
            if (product.productId === elemCart.productId) {
                isInCart = !isInCart;
            }
        });
        return isInCart;
    },
    /**
     * @param  {Array} cart
     * @param  {Number} productIdToDelete
     */
    removeProductInStorage: function (cart, productIdToDelete) {
        let newCart = {};
        newCart.products = cart.filter(product => {
            return product.productId !== productIdToDelete
        });
        newCart.total = Storage.setTotalCart(newCart.products);
        Storage.setUserCart(newCart, {
            isForCreate: false,
            data: productIdToDelete
        });
    },
    /**
     * Check if localstorage has data
     * @return  {Boolean}
     */
    hasData: function () {
        return localStorage.getItem("userCart") !== null;
    },
    /**
     * Return an Array of localstorage
     * @return  {Array}
     */
    getUserCart: function () {
        return JSON.parse(localStorage.getItem("userCart"));
    },
    /**
     * Insert Array in localstorage
     * @param  {Array} cart
     */
    setUserCart: function (cart, detail = {}) {
        localStorage.setItem("userCart", JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('storage', {
            'detail': detail
        }));
    },
    /**
     * Insert Array in localstorage
     * @param  {Array} cart
     */
    setTotalCart: function (cart) {
        total = {price: 0, quantity: 0};
        if (cart.length > 0) {
            cart.forEach(product => {
                total.quantity += Number(product.quantity);
                total.price += product.quantity * product.price;
            });
        }
        return total;
    }
}
