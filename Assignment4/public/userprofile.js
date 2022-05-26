
function loadEventsToMainDiv(){
    $.ajax({
        url:"http://localhost:5000/userprofile/getUserInfo",
        type:"get",
        success:(data)=>{console.log(r) 
                $("fieldset").append(`
                <div class ="timeLog">
                <p> Event Text - ${data.name} </p>
                
                <p> Event Time - ${data.username} </p>
                
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