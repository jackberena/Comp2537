
function loadEventsToMainDiv(){
    $.ajax({
        url:"http://localhost:5000/timeline/getAllEvents",
        type:"get",
        success:(r)=>{console.log(r)
            for(i=0; i < r.length; i++){
                $("main").append(`
                <div class ="timeLog">
                <p> Event Text - ${r[i].text} </p>
                
                <p> Event Time - ${r[i].time} </p>
                
                <p> Event hits - ${r[i].hits} </p>
                <button class ="likeButtons" id="${r[i]["_id"]}"> Like! </button>
                <button class ="deleteButtons" id="${r[i]["_id"]}"> Delete </button></div>
                `)
            }
        }
    })
    
}

function increaseHits(){
    x = this.id
    $.ajax({
        url:`http://localhost:5000/timeline/increaseHits/${x}`,
        type:"get",
        success: function(x) {
            console.log(x)
            location.reload()
        }
    })
}

function remove(){
    x = this.id
    $.ajax({
        url:`http://localhost:5000/timeline/delete/${x}`,
        type:"get",
        success: function(x) {
            console.log(x)
            location.reload()
        }
    })
}



function setup(){
    loadEventsToMainDiv()
    $("body").on("click", ".likeButtons", increaseHits)
    $("body").on("click", ".deleteButtons", remove)
}



$(document).ready(setup)