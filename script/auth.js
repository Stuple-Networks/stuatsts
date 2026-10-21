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
    fetch("https://login.schulmanager-online.de/api/login",
        {
            method: "POST",
            body: JSON
                .stringify
                ({
                    emailOrUsername: email,
                    password: password,
                    hash: null,
                    institutionId: null,
                    falsmobileApp: false
                }),
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((response) => console.log(response));
}
function sendData(email, rawPassword) {
    console.log("Email: " + email + " Passwort: " + rawPassword);
}


