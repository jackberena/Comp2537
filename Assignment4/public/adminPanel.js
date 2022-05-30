// const req = require("express/lib/request")

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
                <h4>username: ${data[l].username}</h4>
                <h4>type: ${data[l].type}</h4>
                <button class ="deleteButtons" id="${data[l]["_id"]}"> Delete </button></div>
                <hr>
            </div>
            </div>
            <div class="contact">
                <span class="las la-user-circle"></span>
            </div>`)
            }
        }
    })
}

function addNewUser(){
    user = $("#username").val()
    console.log($("#username").val())
    pass = $("#password").val()
    usertype = $("#user_type").val()
    $.ajax({
        url:"/insert",
        type:"put",
        data:{
            username: user,
            password: pass,
            type: usertype
        },
        success: (res) => {console.log(res)}
    })
}

function remove(){
    x =this.id
    $.ajax({
        url:`/delete/${x}`,
        success: function(x) {
            console.log(x)
            location.reload()
        }
    })
}



function setup(){
    $("#create").click(addNewUser)
    $("body").on("click", ".deleteButtons", remove)
    displayAllUsers()

}

$(document).ready(setup)