document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    console.log();
    localStorage.clear();
    Method.changeMethod();
    Cart.addToCart();
});

const Method = {
    changeMethod: function () {
        $("form").attr("method", "POST");
    }
}
const Cart = {
    submitBtn: document.querySelectorAll('input[type="submit"]'),
    addToCart: function () {
        for (let i = 0; i < this.submitBtn.length; i++) {
            this.submitBtn[i].addEventListener('click', function (event) {
                event.preventDefault();
                Cart.getDataOfProduct(this.form);
            });

        }
    },
    getDataOfProduct: function (form) {
        const data = {};
        const elements = form.querySelectorAll('input:not([type="submit"]), select');
        for (let i = 0; i < elements.length; ++i) {
            data[elements[i].name] = elements[i].value;
        }

        if (localStorage.getItem("userCart") === null) {
            localStorage.setItem("userCart", JSON.stringify([data]));
        } else {
            var previousData = JSON.parse(localStorage.getItem("userCart"));
            previousData.push(data);
            localStorage.setItem("userCart", JSON.stringify(previousData));
        }
        console.log(JSON.parse(localStorage.getItem("userCart")));
    }
}