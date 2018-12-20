const some_html = `
<li id="${product.productId}" productid="${product.productId}" name="${product.name}" price="${product.price}" quantity="${product.quantity}" color="${product.color}">
<img src="img/${product.productId}.png">
    <div>
        <p><span>${product.name}</span></p>
        <p>
            <span>$${product.price}</span>
            <span>Quantity:
                <select id="select-${product.productId}">
                    ${Html.getOptions(product)}
                </select>
            </span>
            <span class="fa-trash-alt far" data-productid="${product.productId}"></span>
        </p>
    </div>
</li>
  `;

const getNodes = str => {
    return new DOMParser().parseFromString(str, 'text/html').body.childNodes;
}
this.cart.appendChild(getNodes(some_html)[0]);


getOptions: function (product) {
    let options = ``;
    for (let i = 1; i <= product.quantity; i++) {
        options += (i == product.quantity) ?  `<option disabled>${i}</option>` :  `<option>${i}</option>`;
    }
    return options;
}