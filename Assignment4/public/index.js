// function process_response(data){
//     if(data == "success"){
//         location.href = "/userprofile.html"
//     }
// }

function process_response(data){
    if(data == "admin"){
        location.href = "/adminPanel.html"
    } else {
        location.href = "/userprofile.html"
    }
}
        







function listenToClick(){
    $("#login").click(function(){
        $.ajax({
            type:"POST",
            url:"http://localhost:5000/login",
            data:{
                name: $("#username").val(),
                password: $("#password").val()
            },
            success: process_response
        })
    })
}












$(document).ready(listenToClick)