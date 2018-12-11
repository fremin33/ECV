const Html = {
    cart: document.getElementById('cart-pop-up').getElementsByTagName('ul')[0],
    /**
     * Manage insert or update of product in HtmlContent
     * @param {Object} productInCart
     */
    createLiForCart: function (productInCart) {
        productInCart.forEach((product) => {
            let priceTotalProduct = product.quantity * product.price;
            if (!Html.updateHtmlInBody(product, priceTotalProduct))
                Html.insertHtmlInBody(product, priceTotalProduct)
        })
        Html.updateTotalPrice(Storage.getTotalCart().price);
        Html.updateTotalQuantity(Storage.getTotalCart().quantity);
    },
    /**
     * Update product in HtmlContent
     * @param  {Object} product
     * @param  {Number} priceTotalProduct
     */
    updateHtmlInBody: function (product, priceTotalProduct) {
        const liLists = this.cart.getElementsByTagName("li");
        for (var i = 0; i < liLists.length; ++i) {
            if (liLists[i].id === product.productId) {
                liLists[i].getElementsByTagName('span')[1].textContent = `$${priceTotalProduct}`;
                let selectQuantity = document.getElementById(`select-${product.productId}`);
                selectQuantity.innerHTML = "";
                Html.addOptionToSelect(selectQuantity, product);
                return true;
            }
        }
        return false;
    },
    /**
     * Insert product in HtmlContent
     * @param  {Object} product
     * @param  {Number} priceTotalProduct
     */
    insertHtmlInBody: function (product, priceTotalProduct) {
        // Création des élements Html
        const li = Html.createElement('li', {
            id: product.productId
        });
        const img = Html.createElement('img');
        const div = Html.createElement('div');
        const pName = Html.createElement('p');
        const spanName = Html.createElement('span', {
            textContent: product.name
        });
        const pInfo = Html.createElement('p');
        const spanPrice = Html.createElement('span', {
            textContent: `$${priceTotalProduct}`
        })
        const spanQuantity = Html.createElement('span', {
            textContent: `Quantity:`
        })
        const selectQuantity = Html.createElement('select', {
            id: `select-${product.productId}`,
            onclick: Listener.listenSelect
        });
        const spanTrash = Html.createSpanTrash(product.productId);

        Html.setAttributes(li, product);
        Html.setAttributes(img, {
            src: `img/${product.productId}.png`
        })
        Html.addOptionToSelect(selectQuantity, product)
        Html.appendElementInBody(li, img, div, pName, spanName, pInfo, spanPrice, spanQuantity, selectQuantity, spanTrash);
    },
    /**
     * Update img HtmlContent 
     * @param  {string} newImg
     * @param  {Number} id
     */
    updateImgProduct: function (newImg, id) {
        const img = document.getElementById(id);
        img.setAttribute('src', newImg)
    },
    /**
     * Update totalPrice in HtmlContent
     * @param  {Number} totalPrice
     */
    updateTotalPrice: function (totalPrice) {
        const totalPriceElement = document.getElementById('totalPrice')
        totalPriceElement.textContent = totalPrice;
    },
    /**
     * Update total totalQuantity in HtmlContent
     * @param  {Number} totalQuantity
     */
    updateTotalQuantity: function (totalQuantity) {
        const nbProductElems = document.getElementsByClassName('nbProduct');
        for (let nbProductElem of nbProductElems) {
            nbProductElem.textContent = totalQuantity;
        }
    },
    /**
     * Add attributes to HtmlElement
     * @param  {HTMLElement} elem
     * @param  {Object} object
     */
    setAttributes: function (elem, object) {
        for (var key in object) {
            elem.setAttribute(key, object[key]);
        }
    },
    /**
     * Remove product in HtmlContent
     * @param  {Number} productIdToDelete
     */
    removeProduct: function (productIdToDelete) {
        const elem = document.getElementById(productIdToDelete);
        elem.remove();
        Html.updateTotalPrice(Storage.getTotalCart().price);
        Html.updateTotalQuantity(Storage.getTotalCart().quantity);
    },
    /**
     * Create HtmlElement with properties
     * @param  {String} type
     * @param  {Object} properties=false
     */
    createElement: function (type, properties = false) {
        const elem = document.createElement(type);
        if (properties) {
            for (var key in properties) {
                elem[key] = properties[key];
            }
        }
        return elem;
    },
    /**
     * Add option to HTMLElement select
     * @param  {HTMLElement} select
     * @param  {Object} product
     */
    addOptionToSelect: function (select, product) {
        for (let i = 1; i <= product.quantity; i++) {
            const option = Html.createElement('option', {
                text: i,
                selected: "selected"
            });
            if (i == product.quantity) {
                option.disabled = true;
            }
            select.add(option);
        }
        return select;
    },
    /**
     * Create spanTrash to HtmlContent
     * @param  {String} productId
     */
    createSpanTrash: function (productId) {
        const spanTrash = Html.createElement('span', {
            onclick: Listener.listenOnRemoveToCart
        });
        spanTrash.classList.add('fa-trash-alt');
        spanTrash.classList.add('far');
        spanTrash.setAttribute('data-productId', productId);
        return spanTrash;
    },
    /**
     * Insert HTMLElement in HtmlContent
     */
    appendElementInBody: function (li, img, div, pName, spanName, pInfo, spanPrice, spanQuantity, selectQuantity, spanTrash) {
        li.append(img);
        li.append(div);
        div.append(pName)
        pName.append(spanName);
        div.append(pInfo);
        pInfo.append(spanPrice);
        spanQuantity.append(selectQuantity);
        pInfo.append(spanQuantity);
        pInfo.append(spanTrash);
        this.cart.append(li);
    }
}
