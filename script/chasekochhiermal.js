let valid = 0;

function redirect() {
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
function checkToken() {
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

function test(){
    console.log("Stuat")
}

