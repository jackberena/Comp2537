function process_response(data){
    if(data != "incorrect information"){
        location.href = "http://localhost:5000/homepage.html"
    } else{
        
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