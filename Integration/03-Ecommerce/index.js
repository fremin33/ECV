document.addEventListener("DOMContentLoaded", function (event) {
    localStorage.clear();
    Method.changeMethod();
    Listener.listenClick();
});

const Method = {
    changeMethod: function () {
        const formList = document.querySelectorAll('form');
        formList.forEach((form) => {
            form.setAttribute('method', "POST")
        });


    }
}




const Cart = {
    nbProduct: 0,
    updateNbProductCart: function () {
        const nbProductElem = document.getElementById('nbProduct');
        this.nbProduct += 1;
        nbProductElem.innerHTML = this.nbProduct;
    },
    getDataOfProduct: function (form) {
        const product = {};
        const formList = form.querySelectorAll('input:not([type="submit"]), select');
        for (let i = 0; i < formList.length; ++i) {
            product[formList[i].name] = formList[i].value;
        }
        return product;
    }
}


const Storage = {
    addProductToStorage: function (product) {
        var previousCart = JSON.parse(localStorage.getItem("userCart"));
        if (localStorage.getItem("userCart") === null) {
            Storage.addFirstProductToStorage(product)
        } else {
            Storage.checkIfProductIsInCart(previousCart, product);
        }

    },
    addFirstProductToStorage: function (product) {
        localStorage.setItem("userCart", JSON.stringify([product]));
    },
    checkIfProductIsInCart: function (previousCart, product) {
        let isInCart;
        previousCart.forEach((elemCart) => {
            if (product.ProductId === elemCart.ProductId) {
                isInCart = Storage.updateQuantityOfProductInStorage(previousCart, product);
            }
        });
        if (!isInCart) {
            Storage.addNewProductToStorage(previousCart, product)
        }
    },
    addNewProductToStorage: function (previousCart, product) {
        previousCart.push(product);
        localStorage.setItem("userCart", JSON.stringify(previousCart));
    },
    updateQuantityOfProductInStorage: function (previousCart, product) {
        previousCart.forEach((elemCart) => {
            if (product.ProductId === elemCart.ProductId) {
                elemCart.Quantity = parseInt(elemCart.Quantity) + 1;
            }
        });
        localStorage.setItem("userCart", JSON.stringify(previousCart));
        return true;
    }
}

const Listener = {
    submitBtn: document.querySelectorAll('input[type="submit"]'),
    listenClick: function () {
        for (let i = 0; i < this.submitBtn.length; i++) {
            this.submitBtn[i].addEventListener('click', function (event) {
                event.preventDefault();
                const product = Cart.getDataOfProduct(this.form);
                Storage.addProductToStorage(product);
                Cart.updateNbProductCart();
                Html.createLiForCart(JSON.parse(localStorage.getItem("userCart")));
            });

        }
    }
}

const Html = {
    createLiForCart: function (productInCart) {
        productInCart.forEach((d) => {
            if (document.getElementById(d.ProductId)) {
                Html.updateLiForCart(document.getElementById(d.ProductId))
            } else {
                const li = document.createElement('li');
                li.id = d.ProductId;
                li.textContent = d.ProductId;
            }
            document.body.append(li);
        })
    },
    updateLiForCart: function (liElem) {
        console.log(liElem);
    }
}