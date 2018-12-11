document.addEventListener("DOMContentLoaded", function (event) {
    localStorage.clear();
    Method.GetToPost();
    Method.inizializeDom();
    Method.addColorRadio();
    Listener.listenAll();
});

const Method = {
    GetToPost: function () {
        const formList = document.querySelectorAll('form');
        formList.forEach((form) => {
            form.setAttribute('method', "POST")
        });
    },
    addColorRadio: function () {
        const radioBtn = document.querySelectorAll('input[type="radio"]')
        for (let i = 0; i < radioBtn.length; ++i) {
            radioBtn[i].parentElement.style.background = radioBtn[i].value
        }
    },
    inizializeDom: function () {
        if (localStorage.getItem('userCart') !== null)
            Html.createLiForCart(Storage.getUserCart());
    }
};