const express = require('express')
const app = express()
app.set('view engine', 'ejs')

app.listen(process.env.PORT || 5000, function(err){
    if (err) 
        console.log(err);
})


app.use(express.static('public'));

const https = require('https');

app.get('/profile/:id', function(req,res){

    const url =`https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    data = ""
    https.get(url, function(https_res){
        https_res.on("data", function(chunk){
            data += chunk
        })
        https_res.on("end", function(){
            data = JSON.parse(data)
            attack = data.stats.filter((obj_)=>{
                return obj_.stat.name == "attack"
            }).map((obj2)=>{
                return obj2.base_stat
            })

            speed = data.stats.filter((obj_)=>{
                return obj_.stat.name == "speed"
            }).map((obj2)=>{
                return obj2.base_stat
            })
            defense = data.stats.filter((obj_)=>{
                return obj_.stat.name == "defense"
            }).map((obj2)=>{
                return obj2.base_stat
            })

            hp = data.stats.filter((obj_)=>{
                return obj_.stat.name == "hp"
            }).map((obj2)=>{
                return obj2.base_stat

            })
            res.render("profile.ejs",{
                "id":req.params.id,
                "name": data.name,
                "hp": hp[0],
                "attack":attack[0],
                "defense":defense[0],
                "speed":speed[0],
                "weight": data.weight,
                "height": data.height
            }
           )
        })
    })
})