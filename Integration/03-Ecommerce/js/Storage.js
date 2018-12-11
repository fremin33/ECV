const Storage = {
    quantityProductRemove: 0,
    /**
     * Manage insert or update of product in localstorage
     * @param {Object} product
     * @param {Boolean} addQuantity
     */
    addProductInStorage: function (product, addQuantity = true) {
        let cart = Storage.getUserCart();
        if (Storage.hasData()) {
            if (Storage.checkIfProductIsInCart(cart, product)) {
                cart = (addQuantity) ? Storage.addQuantityOnProductInStorage(cart, product) : Storage.removeQuantityOnProductInStorage(cart, product);
            } else {
                cart = Storage.addNewProductInStorage(cart, product)
            }
        } else {
            cart = Storage.addFirstProductInStorage(product)
        }
        Storage.setTotalCart(cart);
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
        let newCart = cart.filter(product => {
            return product.productId !== productIdToDelete
        });
        Storage.setTotalCart(newCart);
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
     * Return an Array of localstorage
     * @return  {Array}
     */
    getTotalCart: function () {
        return JSON.parse(localStorage.getItem("totalCart"));
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
        localStorage.setItem("totalCart", JSON.stringify(total));
    }
}
