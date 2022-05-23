
function loadEventsToMainDiv(){
    $.ajax({
        url:"http://localhost:5000/userprofile/getUserInfo",
        type:"get",
        success:(data)=>{console.log(r) 
                $("main").append(`
                <div class ="timeLog">
                <p> Event Text - ${data[i].name} </p>
                
                <p> Event Time - ${data[i].username} </p>
                
                <button class ="likeButtons" id="${r[i]["_id"]}"> Like! </button>
                <button class ="deleteButtons" id="${r[i]["_id"]}"> Delete </button></div>
                `)
            
        }
    })
    
}

function setup(){
    loadEventsToMainDiv()
}



$(document).ready(setup)