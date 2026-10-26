let valid = 0;

function redirect() { //deprecated
    const currentQueryString = window.location.search; 
    if(valid == 1){
        window.location.href = `katalogV/index.html${currentQueryString}`;
        console.log("Token Validated");
    }
    else if(valid == 0){
        window.location.href = "katalogUV/index.html";
        console.error("Token invalid");
    }
    else{
        console.error("Could not Validate Token");
    }
}

function checkToken() { //deprecated
    const queryToken = window.location.search;
    const urlPara = new URLSearchParams(queryToken);
    const token = urlPara.get('token');
    if (token) {
        validateToken(token);
    } else {
        valid = 0; 
    }
    redirect();
}

function validateToken(token){ //deprecated
    const expectedToken = "valid"; 
    if (token == expectedToken) {
        valid = 1; 
    } else {
        valid = 0; 
    }
}

function test(token){
    console.log("Stuat");
    console.log(token);
}

function buy() { //deprecated
    const ammount = document.getElementById("ticketNum").value;
    const groesse = document.getElementById("groesse").value;  
    console.log(ammount +" " + groesse);
}

function add(productName, unitPrice, sizeElementId, qtyElementId, colorElementId) {
    const anzahl = parseInt(document.getElementById(qtyElementId).value) || 0;
    const groesse = document.getElementById(sizeElementId).value;
    
    let color = "Standard";
    if (colorElementId) {
        const colorEl = document.getElementById(colorElementId);
        if (colorEl) color = colorEl.value;
    }

    if (anzahl <= 0) {
        alert("Bitte wähle mindestens 1 Produkt aus!");
        return;
    }
    const inspreis = unitPrice; 
    const preis = unitPrice * anzahl; 
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    
    let existingItem = cart.find(item => item.name === productName && item.groesse === groesse && (item.color || "Standard") === color);

    if (existingItem) {
        existingItem.anzahl += anzahl;
        existingItem.preis += preis;
    } else {
        cart.push({
            name: productName,
            preis: preis,
            inspreis: inspreis,
            anzahl: anzahl,
            groesse: groesse,
            color: color
        });
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    cartCountUpdate();
    
}

function lesen(){
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    if (cart.length === 0) {
        console.log("Your cart is empty.");
        return;
    }
    let total = 0;
    cart.forEach(function(item, index) {
        console.log(`Item ${index + 1}: ${item.name} (${item.color}) - ${item.groesse} - ${item.anzahl}x - ${item.preis}€`);
        total += item.preis;
    });
}

function clears(){
    localStorage.removeItem('shoppingCart');
    cartCountUpdate();
    lsitems();
}

function cartCountUpdate() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const corpBtn = document.getElementById('corp');
    if (corpBtn) {
        corpBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>: ${cart.length}`;
    }
}

function lsitems() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
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

    cart.forEach(function(item) {
        const row = document.createElement('tr');
        const priceNumber = parseFloat(item.preis) || 0;
        const singlePrice = parseFloat(item.inspreis) || 0;
        
        const actionTd = document.createElement('td');
        actionTd.style.textAlign = 'center';
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

        removeBtn.onclick = function() {
            removeItems(item.name, item.groesse, item.color);
        };
        actionTd.appendChild(removeBtn);
        row.appendChild(actionTd);

        const nameTd = document.createElement('td');
        const displayColor = item.color && item.color !== "Standard" ? ` (${item.color})` : "";
        nameTd.textContent = (item.name || 'Produkt') + displayColor;
        row.appendChild(nameTd);

        const sizeTd = document.createElement('td');
        sizeTd.textContent = item.groesse || 'Grösse';
        row.appendChild(sizeTd);

        const qtyTd = document.createElement('td');
        qtyTd.textContent = item.anzahl;
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

function corp(){
    window.location.href = `corp.html`;
}

function cart(){
    cartCountUpdate();
}

function order() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    if (cart.length === 0) {
        alert("Dein Warenkorb ist leer!");
        return;
    }
    let cartText = "Bestellung:\n";
    let total = 0;
    cart.forEach(function(item) {
        const priceNumber = parseFloat(item.preis) || 0;
        const colorText = item.color && item.color !== "Standard" ? ` (${item.color})` : "";
        cartText += `${item.anzahl}x ${item.name || 'Produkt'}${colorText} (${item.groesse || 'Grösse'}): ${priceNumber.toFixed(2)} €\n`;
        total += priceNumber;
    });
    cartText += `\nGesamt: ${total.toFixed(2)} €`;
    
    navigator.clipboard.writeText(cartText).then(function() {
        alert("Warenkorb wurde in die Zwischenablage kopiert!");
    }).catch(function(err) {
        console.error("Fehler beim Kopieren: ", err);
        alert("Kopieren fehlgeschlagen!");
    });
}

function removeItems(prname, prg, prcolor) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const targetColor = prcolor || "Standard";
    
    
    const index = cart.findIndex(item => {
        const itemColor = item.color || "Standard";
        return item.name === prname && item.groesse === prg && itemColor === targetColor;
    });
    
    if (index !== -1) {
        
        cart.splice(index, 1);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        
        
        cartCountUpdate();
        lsitems();
    } else {
        console.log("Could not find item to remove:", prname, prg, targetColor);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    lsitems();
    cartCountUpdate();
});
