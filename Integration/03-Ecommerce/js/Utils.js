const Utils = {
    /**
     * Return product create with form
     * @param  {HTMLFormElement} form
     * @returns {Object}
     */
    createProductWithForm: function (form) {
        const product = {};
        const formList = form.querySelectorAll('input:not([type="submit"]), select');
        for (let i = 0; i < formList.length; ++i) {
            if (formList[i].type === "radio") {
                if (formList[i].checked)
                    product[formList[i].name] = formList[i].value;
            } else {
                product[formList[i].name] = formList[i].value;
            }
        }
        product.productId = `${product.productId}-${product.color}`;
        return product;
    },
    /**
     * Return product create with data-attribute of Cart
     * @param  {HTMLElement} productElem
     * @param  {Number} quantity
     * @returns {Object}
     */
    createProductWithAttributes: function (productElem, quantity) {
        let product = {
            "productId": productElem.getAttribute('productId'),
            "quantity": quantity,
            "color": productElem.getAttribute('color'),
            "name": productElem.getAttribute('name'),
            "price": productElem.getAttribute('price'),
            "update": true
        };
        return product;
    },
    triggerClass: function (elem, className) {
        if (elem.classList.contains(className)) {
            elem.classList.remove(className);
        } else {
            elem.classList.add(className);
        }
    }
}