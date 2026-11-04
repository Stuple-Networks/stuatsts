const SHOPPING_CART = "shoppingCart"

function add(element, id) {

    const div = element.parentElement;

    let cart = JSON.parse(localStorage.getItem(SHOPPING_CART)) || [];

    if (div.querySelector('[name="buy_count"]')?.value <= 0) {
        alert("Bitte wähle mindestens 1 Produkt aus!");
        return;
    }

    cart.push({
        id: id,
        name: div.querySelector('[name="product_name"]')?.dataset.name,
        size: div.querySelector('[name="size"]')?.value,
        sex: div.querySelector('[name="sex"]')?.value,
        color: div.querySelector('[name="color"]')?.value,
        amount: div.querySelector('[name="buy_count"]')?.value,
        price: div.querySelector('[name="price"]')?.dataset.price
    });

    localStorage.setItem(SHOPPING_CART, JSON.stringify(cart));
    cartCountUpdate();

}

function clearAll() {
    localStorage.removeItem(SHOPPING_CART);
    cartCountUpdate();
    listCart();
}

function changeColor(element, id) {
    console.log("uwu");
    const div = element.parentElement
    const color = div.querySelector('[name="color"]')?.value;
    const img = div.parentElement.querySelector('img');
    img.setAttribute('src', `img/${id + '_' + color}.jpg`);
}

function cartCountUpdate() {
    let cart = JSON.parse(localStorage.getItem(SHOPPING_CART)) || [];
    const corpBtn = document.getElementById('corp');
    if (corpBtn) {
        corpBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>: ${cart.length}`;
    }
}

function listCart() {
    let cart = JSON.parse(localStorage.getItem(SHOPPING_CART)) || [];
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');

    if (!cartList || !cartTotal) return;

    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = `<tr><td colspan="6" style="text-align: center;">Dein Warenkorb ist leer.</td></tr>`;
        cartTotal.textContent = "Gesamt: 0,00 €";
        return;
    }

    let total = 0;

    cart.forEach(function (item, i) {
        const row = document.createElement('tr');
        const priceNumber = parseFloat(item.price * item.amount) || 0;
        const singlePrice = parseFloat(item.price) || 0;

        const actionTd = document.createElement('td');
        actionTd.style.textAlign = 'center';
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

        removeBtn.onclick = function () {
            removeItems(i);
        };
        actionTd.appendChild(removeBtn);
        row.appendChild(actionTd);

        const nameTd = document.createElement('td');
        const displayColor = item.color && item.color !== "Standard" ? ` (${item.color})` : "";
        nameTd.textContent = (item.name || 'Produkt') + displayColor;
        row.appendChild(nameTd);

        const sizeTd = document.createElement('td');
        sizeTd.textContent = item.size || '';
        row.appendChild(sizeTd);

        const qtyTd = document.createElement('td');
        qtyTd.textContent = item.amount;
        row.appendChild(qtyTd);

        const singlePriceTd = document.createElement('td');
        singlePriceTd.textContent = `${singlePrice.toFixed(2)} €`;
        row.appendChild(singlePriceTd);

        const totalRowTd = document.createElement('td');
        totalRowTd.textContent = `${priceNumber.toFixed(2)} €`;
        row.appendChild(totalRowTd);

        cartList.appendChild(row);
        total += priceNumber;
    });

    cartTotal.textContent = `Gesamt: ${total.toFixed(2)} €`;
}

function corp() {
    window.location.href = `corp.html`;
}

function order() {
    let cart = JSON.parse(localStorage.getItem(SHOPPING_CART)) || [];
    if (cart.length === 0) {
        alert("Dein Warenkorb ist leer!");
        return;
    }
    let cartText = "Bestellung:\n";
    let total = 0;
    cart.forEach(function (item) {
        const priceNumber = parseFloat(item.price * item.amount) || 0;
        const colorText = item.color && item.color !== "Standard" ? ` (${item.color})` : "";
        cartText += `${item.amount}x ${item.name || 'Produkt'}${colorText} (${item.size || 'Grösse'}): ${priceNumber.toFixed(2)} €\n`;
        total += priceNumber;
    });
    cartText += `\nGesamt: ${total.toFixed(2)} €`;

    navigator.clipboard.writeText(cartText).then(function () {
        
    }).catch(function (err) {
        console.error("Fehler beim Kopieren: ", err);
        
    });
}

function removeItems(index) {
    let cart = JSON.parse(localStorage.getItem(SHOPPING_CART)) || [];

    cart.splice(index, 1);
    localStorage.setItem(SHOPPING_CART, JSON.stringify(cart));

    cartCountUpdate();
    listCart();
}

document.addEventListener('DOMContentLoaded', function () {
    listCart();
    cartCountUpdate();
});
