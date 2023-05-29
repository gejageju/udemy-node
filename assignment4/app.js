const express = require('express')
const bodyParser = require('body-parser')
const path= require('path')

const members=[]
const app=express()

app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine','ejs')
app.set('views','views')

app.get('/form',(req,res,next)=>{
    res.render('form.ejs',{docTitle : 'Add user'});
})

app.post('/handle-form',(req,res,next)=>{
    members.push(req.body.name);
    console.log(members);
    res.redirect('/');
})

app.get('/',(req,res,next)=>{
    res.render('members',{docTitle : 'Our members', members : members});
})

app.listen(8000)

