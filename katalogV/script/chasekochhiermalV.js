let valid = 0;
function redirect() { //sollte man später rmen
    if(valid == 1){
        window.location.href = "katalogV/index.html";
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
function checkToken() {
    const queryToken = window.location.search;
    const urlPara = new URLSearchParams(queryToken);
    const token = urlPara.get('token');
    if (token) {
        validateToken(token);
    } else {
        valid = 0; 
    }
    test(token);
}
function validateToken(token){
    const expectedToken = "vaild"; 

    if (token == expectedToken) {
        valid = 1; 
        
    } else {
        valid = 0; 
    }
}

function bestellen(token){
    
}

function test(token){
    console.log("Stuat")
    console.log(token)
}

function buy() {
    const ammount = document.getElementById("ticketNum").value;
    const groesse = document.getElementById("groesse").value;  
    console.log(ammount +" " + groesse);
}
