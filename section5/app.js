const express = require('express');
const bodyParser = require('body-parser');
const path= require('path');
const rootDir = require('./util/path.js')

const app=express();
const adminData= require('./routes/admin.js');
const shopRoutes= require('./routes/shop.js');

app.set('view engine','ejs');
app.set('views','views')

app.use(bodyParser.urlencoded( {extended : false}));
app.use(express.static(path.join(rootDir,'public')));

app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use((req,res,next)=>{
    res.status(404).render('error404',{docTitle : 'Page Not Found' , path : ''});
})

//module.exports = path.dirname(require.main.filename);
app.listen(3000);