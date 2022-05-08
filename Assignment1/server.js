const express = require('express')
const app = express()
app.set('view engine', 'ejs')

app.listen(5000, function(err){
    if (err) 
        console.log(err);
})


app.use(express.static('public'));

app.get('/profile/:id', function(req,res){
    res.render("profile.ejs",{
         "id":req.params.id}
         
         )
})