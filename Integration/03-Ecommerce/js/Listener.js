const Listener = {
    submitBtn: document.querySelectorAll('input[type="submit"]'),
    radioBtn: document.querySelectorAll('input[type="radio"]'),
    selectBtn: document.getElementsByTagName('select'),
    /**
     * Call all event listener
     */
    listenAll: function () {
        Listener.listenOnAddToCart();
        Listener.listenStorage();
        Listener.listenRadio();
        Listener.listenSelect();
    },
    /**
     * Add an event listener when click on AddToCartBtn
     */
    listenOnAddToCart: function () {
        for (let i = 0; i < this.submitBtn.length; i++) {
            this.submitBtn[i].addEventListener('click', function (event) {
                event.preventDefault();
                Storage.addProductInStorage(Utils.createProductWithForm(this.form));
            });
        }
    },
    /**
     * Add an event listener when click on TrashBtn
     */
    listenOnRemoveToCart: function () {
        Storage.removeProductInStorage(Storage.getUserCart().products, this.getAttribute('data-productId'));
    },
    /**
     * Add an event listener when click on AddToCartBtn
     */
    listenSelect: function (event) {
        if (event !== undefined) {
            const product = Utils.createProductWithAttributes(this.parentElement.parentElement.parentElement.parentElement, this.value);
            Storage.addProductInStorage(product, false);
        }
    },
    /**
     * Add an event listener when click on RadioBtn
     */
    listenRadio: function () {
        for (let i = 0; i < this.radioBtn.length; i++) {
            this.radioBtn[i].addEventListener('click', function (event) {
                Html.updateImgProduct(this.getAttribute('data-img'), this.parentElement.parentElement.getAttribute('data-id'));
            });
        }
    },
    /**
     * Add an event listener when change on LocalStorage
     */
    listenStorage: function () {
        window.addEventListener("storage", function (e) {
            (e.detail.isForCreate) ? Html.createLiForCart(Storage.getUserCart().products): Html.removeProduct(e.detail.data);
        });
    }
}