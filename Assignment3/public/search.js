type_g = ""

function processPokemonResp(data) {
    for (i = 0; i < data.types.length; i++)
        if (data.types[i].type.name == type_g) {

            $("main").append("<p>#" + data.id + "</p>")
            $("main").append("<p>" + data.name + "</p>")
            $("main").append(`<div class = "image_container">
            <a href="/profile/${data.id}">
             <img src="${data.sprites.other["official-artwork"].front_default}"></a></div>`)

        }

}

function getbyname(data) {
    $("main").append("<p>#" + data.id + "</p>")
            $("main").append("<p>" + data.name + "</p>")
            $("main").append(`<div class = "image_container">
            <a href="/profile/${data.id}">
             <img src="${data.sprites.other["official-artwork"].front_default}"></a>`)
}

        



function display(type_) {
    $("main").empty();
    type_g = type_
    for (i = 1; i < 851; i++) {

        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processPokemonResp
        })
    }



}
$("main").html()


function search_name() {
    $("main").empty();
    x = $("#pokemon_name").val()
    $.ajax({
        type: "get",
        url: `https://pokeapi.co/api/v2/pokemon/${x}`,
        success: getbyname
    })
}
$("main").html()


function setup() {
    $("#get_pokemon").click(search_name)
    display($("#poke_type option:selected").val())
    $("#poke_type").change(() => {
        display($("#poke_type option:selected").val())
    })
    
}

$(document).ready(setup)