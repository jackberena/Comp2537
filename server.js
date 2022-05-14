const express = require('express')
const app = express()
const bodyparser = require("body-parser")
app.set('view engine', 'ejs')

const mongoose = require('mongoose')

app.use(bodyparser.urlencoded({
    extended:true
}))

app.listen(process.env.PORT || 5000, function(err){
    if (err) 
        console.log(err);
})

 

mongoose.connect("mongodb://localhost:27017/timelineDB",{
    useNewURLParser: true, useUnifiedTopology: true})
const timelineSchema = new mongoose.Schema({
    text: String,
    hits: Number,
    time: String
})
const timelineModel = mongoose.model("timelines", timelineSchema)

app.get('/timeline/getAllEvents', function(req, res){
    timelineModel.find({}, function(err, data){
        if (err){
            console.log("Errors" + err);
        }else{
            console.log("Data" + data);
        }
        res.send(data);
    })
})



app.put('/timeline/insert', function(req, res){
    console.log(req.body)
    timelineModel.create({
        'text': req.body.text,
        'time': req.body.time,
        'hits': req.body.hits
    },
        function (err, data){
        if (err){
            console.log("Errors" + err);
        }else{
            console.log("Data" + data);
        }
        res.send(data);
    });
})

app.get('/timeline/delete/:id', function(req, res){
    //console.log(req.body)
    timelineModel.remove({
        '_id':req.params.id
    },
        function (err, data){
        if (err){
            console.log("Errors" + err);
        }else{
            console.log("Data" + data);
        }
        res.send("Delete request is successful");
    });
})

app.get('/timeline/increaseHits/:id', function(req, res){
    //console.log(req.body)
    timelineModel.updateOne({
        '_id':req.params.id
    },{
        $inc: {"hits": 1}
    } ,
        function (err, data){
        if (err){
            console.log("Errors" + err);
        }else{
            console.log("Data" + data);
        }
        res.send("Increase successful");
    });
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