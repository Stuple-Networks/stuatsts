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
function add() {
    const ammount = document.getElementById("ticketNum").value;
    const groesse = document.getElementById("groesse").value;  
    const pname = document.getElementById('hod').textContent;
    const preismitzeichen = document.getElementById('preis2').textContent;
    const preisohnezeichen = preismitzeichen.replace('€', '').trim();
    const preiskommazupunkt = preisohnezeichen.replace(',','.');
    const preis = parseFloat(preiskommazupunkt);
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const produkt = {
        name: pname,
        preis: preis,
        groesse: groesse,
        anzahl: ammount
    }
    if(ammount == 0){
        console.log("No Ammount defined! Not Adding");
    }else{
        
        cart.push(produkt);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        document.getElementById('corp').textContent="Warenkorb: "+ cart.length;
    }
    
    //console.log(ammount +" " + groesse + " "+ pname);
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
        listItem.textContent = `${item.anzahl}x ${item.name || 'Produkt'} (${item.groesse || 'Grösse'}): ${priceNumber.toFixed(2)} €`;
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
//window.onload = lsitems;
document.addEventListener('DOMContentLoaded', function() {
    lsitems();
    cart();
});