to_add = ''

function processPokeResp(data){
    to_add += `${data.name} <div class = "image_container">
    <a href="/profile/${data.id}">
     <img src="${data.sprites.other["official-artwork"].front_default}"></a> </div>`
}
async function loadNineImages(){
    for (i = 1; i <= 9 ; i++){
        if(i % 3 == 1){
            to_add += `<div class="images_group">`
        }
        x = Math.floor(Math.random() * 850) + 1

        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${x}`,
            success: processPokeResp
        })
        
        if (i % 3 == 0){
            to_add += `</div>`
        }
    }
    jQuery("main").html(to_add)
}


function setup(){
    loadNineImages();
}


jQuery(document).ready(setup)