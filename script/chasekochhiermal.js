let valid = 0;

//document.getElementById('addbutton').addEventListener('onclick', function (event) {
//    event.preventDefault();
//});

function redirect() { //deprecated
    const currentQueryString = window.location.search; 
    if(valid == 1){
        window.location.href = `katalogV/index.html${currentQueryString}`;
        console.log("Token Validated")
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
function validateToken(token){ //depreacted
    const expectedToken = "valid"; 

    if (token == expectedToken) {
        valid = 1; 
    } else {
        valid = 0; 
    }
}

function bestellen(token){ //deprecated
    
}

function test(){
    console.log("Stuat")
}
function authd(){ //deprecated
    const queryToken = window.location.search;
    const urlPara = new URLSearchParams(queryToken);
    const token = urlPara.get('token');
    const expectedToken = "valid";
    console.log("Moving to Auth");
    console.log(token + " " + expectedToken)
    if (token == expectedToken) {
        window.location.href = `katalogV/index.html?token=${token}`;
    } else {
        window.location.href = `auth.html`; 
    }
}

function test(token){
    console.log("Stuat")
    console.log(token)
}

function buy() { //depreacted
    const ammount = document.getElementById("ticketNum").value;
    const groesse = document.getElementById("groesse").value;  
    console.log(ammount +" " + groesse);
}
function add(productName, unitPrice, sizeElementId, qtyElementId) {
    const anzahl = parseInt(document.getElementById(qtyElementId).value) || 0;
    const groesse = document.getElementById(sizeElementId).value;

    if (anzahl <= 0) {
        alert("Bitte wähle mindestens 1 Produkt aus!");
        return;
    }
    const inspreis = unitPrice; 
    const preis = unitPrice * anzahl; 
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let existingItem = cart.find(item => item.name === productName && item.groesse === groesse);

    if (existingItem) {
        existingItem.anzahl += anzahl;
        existingItem.preis += preis;
    } else {
        cart.push({
            name: productName,
            preis: preis,
            inspreis: inspreis,
            anzahl: anzahl,
            groesse: groesse
        });
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    const corpBtn = document.getElementById('corp');
    if (corpBtn) {
        corpBtn.textContent = "Warenkorb: " + cart.length;
    }
}
function lesen(){
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    if (cart.length === 0) {
        console.log("Your cart is empty.");
        return;
    }
    let total = 0;
    cart.forEach(function(item, index) {
        console.log(`Item ${index + 1}: ${item.name} - ${item.groesse} - ${item.anzahl} - ${item.preis}€`);
        total += item.price;
    });
}
function clears(){
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    localStorage.removeItem('shoppingCart');
    document.getElementById('corp').textContent="Warenkorb: 0";
    //localStorage.clear()
}

function lsitems(){
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    if (!cartList || !cartTotal) return;
    cartList.innerHTML = "";
    if (cart.length === 0) {
        cartList.innerHTML = "<li>Dein Warenkorb ist leer.</li>";
        cartTotal.textContent = "Gesamt: 0,00 €";
        return;
    }
    let total = 0;
    cart.forEach(function(item) {
        const listItem = document.createElement('li');
        const priceNumber = parseFloat(item.preis) || 0;
        const textSpan = document.createElement('span');
        listItem.textContent = `${item.anzahl}x ${item.name || 'Produkt'} (${item.groesse || 'Grösse'}): ${priceNumber.toFixed(2)}€ (Pro Stück: ${item.inspreis}€) `;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Entfernen';
        removeBtn.onclick = function() {
            removeItems(item.name, item.groesse);
        };
        listItem.appendChild(removeBtn);
        cartList.appendChild(listItem);
        total += priceNumber;
    });
    cartTotal.textContent = `Gesamt: ${total.toFixed(2)} €`;
}
function corp(){
    lsitems();
    window.location.href = `corp.html`;
    lsitems();
}
function cart(){
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    document.getElementById('corp').textContent="Warenkorb: "+ cart.length;
}
function order() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    if (cart.length === 0) {
        alert("Dein Warenkorb ist leer!");
        return;
    }
    let cartText = "Bestellung:\n";
    let total = 0;
    cart.forEach(function(item, index) {
        const priceNumber = parseFloat(item.preis) || 0;
        cartText += `${item.anzahl}x ${item.name || 'Produkt'} (${item.groesse || 'Grösse'}): ${priceNumber.toFixed(2)} €\n`;
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
function removeItems(prname,prg){
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const index = cart.findIndex(item => item.name === prname & item.groesse === prg);
    if (!cartList || !cartTotal) return;
    cartList.innerHTML = "";
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        if(cart.length === 0){
            cartList.innerHTML = "<li>Dein Warenkorb ist leer.</li>";
            cartTotal.textContent = "Gesamt: 0,00 €";
            return;
        }
        let total = 0;
        cart.forEach(function(item) {
            const listItem = document.createElement('li');
            const priceNumber = parseFloat(item.preis) || 0;
            const textSpan = document.createElement('span');
            listItem.textContent = `${item.anzahl}x ${item.name || 'Produkt'} (${item.groesse || 'Grösse'}): ${priceNumber.toFixed(2)}€ (Pro Stück: ${item.inspreis}€) `;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Entfernen';
            removeBtn.onclick = function() {
                removeItems(item.name, item.groesse);
            };
            listItem.appendChild(removeBtn);
            cartList.appendChild(listItem);
            total += priceNumber;
        });
        cartTotal.textContent = `Gesamt: ${total.toFixed(2)} €`;

    }else{
        console.log("could not remove item")
    }
    
}
//window.onload = lsitems;
document.addEventListener('DOMContentLoaded', function() {
    lsitems();
    cart();
});

