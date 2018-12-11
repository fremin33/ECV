                // Création des élements Html
                const li = Html.createElement('li', {id: product.productId});
                const img = Html.createElement('img');
                const div = Html.createElement('div');
                const pName = Html.createElement('p');
                const spanName = Html.createElement('span', {textContent: product.name});
                const pInfo = Html.createElement('p');
                const spanPrice = Html.createElement('span', {textContent: `$${priceTotalProduct}`})
                const spanQuantity = Html.createElement('span', {textContent: `Quantity:`})
                const selectQuantity = Html.createElement('select', {id: `select-${product.productId}`,onclick: Listener.listenSelect});
                const spanTrash = Html.createSpanTrash(product.productId);