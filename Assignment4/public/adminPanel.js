function displayAllUsers() {
    $.ajax({
        type: "get",
        url: "/getUsers",
        success: (data) => {
            $("main").empty()
            $("main").append(`<div class="card">
            <div class="card-header">
            <h3>All Users</h3>
            </div>
            <div class="card-body">
            <div class="customer">
            </div>
            </div>`)
            for (l = 0; l < data.length; l++) {
                $(".customer").append(`<div class="info">
                <div>
                <img src="${data[l].img}" width="40px" height="40px" alt="">
            </div>
            <div>
                <h4>${data[l].username}</h4>
            </div>
            </div>
            <div class="contact">
                <span class="las la-user-circle"></span>
            </div>`)
            }
        }
    })
}







function setup(){
    displayAllUsers()
}

$(document).ready(setup)