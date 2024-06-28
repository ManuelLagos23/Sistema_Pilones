


$(document).ready(function () {
    $.get("/api/user", function (data) {

console.log(data);
        data.forEach(function (users) {
            $("#usersList").append(`
                <tr>
                    <td>${users.id}</td>
                    <td>${users.user}</td>
                    <td>${users.name}</td>
                    <td>${users.rol}</td>
                    <td>${users.password}</td>
                
                </tr>
            `);
        });




 
});
});

