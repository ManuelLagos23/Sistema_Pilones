$(document).ready(function () {
    $.get("/api/login", function (data) {
        data.forEach(function (login) { 


            document.getElementById('correo_info').value = login.email;

        })
    })
})
 

$("#createLoginCorreoForm").submit(function (event) {
    event.preventDefault();

    const email = $("#login_email").val();
    const password = $("#login_password").val();
    const id = 1; 

    console.log(email);
    console.log(password);

    fetch(`/api/login`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id, 
            email,
            password,
        })
    })
    .then(response => {
        if (response.ok) {
            $("#successLoginModal").on("shown.bs.modal", function () {
                setTimeout(function () {
                    location.reload();
                }, 5000);
            }).modal("show");
        } else {
            throw new Error('Error updating correo.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
