const express = require('express')
const app = express()
const ejs =require('ejs')
app.set('views', './views')
app.set('view engine', 'ejs')
const mongoose = require('mongoose')
const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({
    extended: true
}));

app.listen(process.env.PORT || 5000, function (err) {
    if (err)
        console.log(err);
})

var session = require('express-session')
app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
}))

app.use("/css", express.static("/css"));
app.use("/js", express.static("/js"));
app.use("/img", express.static("/img"))
app.use("/views",express.static("/views"))

const cors = require('cors')
app.use(cors())

app.use(express.static('public'));

const https = require('https');
const { Router } = require('express')

app.get('/profile/:id', function (req, res) {

    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    data = ""
    https.get(url, function (https_res) {
        https_res.on("data", function (chunk) {
            data += chunk
        })
        https_res.on("end", function () {
            data = JSON.parse(data)
            attack = data.stats.filter((obj_) => {
                return obj_.stat.name == "attack"
            }).map((obj2) => {
                return obj2.base_stat
            })

            speed = data.stats.filter((obj_) => {
                return obj_.stat.name == "speed"
            }).map((obj2) => {
                return obj2.base_stat
            })
            defense = data.stats.filter((obj_) => {
                return obj_.stat.name == "defense"
            }).map((obj2) => {
                return obj2.base_stat
            })

            hp = data.stats.filter((obj_) => {
                return obj_.stat.name == "hp"
            }).map((obj2) => {
                return obj2.base_stat

            })
            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "hp": hp[0],
                "attack": attack[0],
                "defense": defense[0],
                "speed": speed[0],
                "weight": data.weight,
                "height": data.height
            })
        })
    })
})

mongoose.connect("mongodb+srv://laxman:kyle@cluster0.67nxx.mongodb.net/Database?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const userSchema = new mongoose.Schema({
    _id: Object,
    name: String,
    username: String,
    password: String
})

const userModel = mongoose.model("users", userSchema)


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

function filter_password(data) {
    return data.password
}

app.post("/login", function (req, res) {
    console.log("login request recieved")
    console.log(req.body.name, req.body.password)
    username = req.body.name
    pass = req.body.password

    userModel.find({
        username: username
    }, function (err, user) {
        var full_info = user
        console.log("Full info:", full_info)
        if (err) {
            console.log(err)
        } else  {
            user = user.map(filter_password)
            console.log(user[0])
            if (req.body.password == user[0]) {
                id = full_info[0]._id
                req.session.real_user = full_info
                console.log(req.body.name)
                req.session.authenticated = true
                if (req.session.real_user[0].type == "admin"){
                    res.send("admin detected")
                } else{
                res.send(req.session.real_user[0])
                }
            } else {
                console.log("entered incorrect")
                req.session.authenticated = false
                res.send("incorrect information")
            }
        }
    })
})

app.get("/getUserInfo", function (req, res) {
    userModel.find({
      username: req.session.real_user[0].username
    }, function (err, data) {
      if (err) {
        console.log("Err" + err)
      } else {
        console.log("Data" + data)
        res.json(data)
      }
    })
  })

// app.get('/userprofile'), (req,res) => {
//     userModel.find({name: req.session.real_user[0].name}, function (err,users) {
//         res.render('index', {
//             name: req.session.real_user[0].name,
//             username: req.session.real_user[0].username
//         })
//     })
// }

// app.get('/userprofile.html/getUserInfo', function(req, res){
//     console.log(req.session.real_user)
    
// })

