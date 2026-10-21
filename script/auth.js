document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    getData();
});
function getData() {
    const email = document.getElementById('email').value;
    const rawPassword = document.getElementById('password').value;
    const errorBox = document.getElementById('error-message');

    requestSchulmanagerAuth(email, rawPassword);

}

function requestSchulmanagerAuth(email, password) {
    const targetUrl = "https://login.schulmanager-online.de/api/login";
    const proxyUrl = "https://corsproxy.io/?=" + encodeURIComponent(targetUrl);

    fetch(proxyUrl, {
        method: "POST",
        body: JSON.stringify({
            emailOrUsername: email,
            password: password,
            hash: null,
            institutionId: null,
            falseMobileApp: false
        }),
        headers: {
            "Content-type": "application/json",
        },
    })
    .then((response) => response.json()) 
    .then((data) => {
        console.log("Success! Server Response:", data);
        
    })
    .catch((error) => {
        console.error("Login failed or blocked:", error);
    });
}
function sendData(email, rawPassword) {
    console.log("Email: " + email + " Passwort: " + rawPassword);
}


