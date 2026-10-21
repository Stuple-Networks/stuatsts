document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    getData();
});
function getData(){
    const email = document.getElementById('email').value;
    const rawPassword = document.getElementById('password').value;
    const errorBox = document.getElementById('error-message');
    if(email.includes("@")){
        //check für @ symbol
        errorBox.textContent = "";
        console.log("Email is valid");
        
    }
    else{
        errorBox.textContent = "Error: Not a Valid Email";
    }
    //console.log("Email: " +email+ " Passwort: "+password); remove before final version
    
}
function sendData(email,rawPassword){
    console.log("Email: " +email+ " Passwort: "+rawPassword);
}


