const express = require('express');
const bodyParser = require('body-parser');
const path= require('path');
const rootDir = require('./util/path.js')

const app=express();
const adminRoutes= require('./routes/admin.js');
const shopRoutes= require('./routes/shop.js');
const errorsController = require('./controllers/errors.js')
const db = require('./util/database.js')


app.set('view engine','ejs');
app.set('views','views')

app.use(bodyParser.urlencoded( {extended : false}));
app.use(express.static(path.join(rootDir,'public')));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

//db.execute('SELECT * FROM products').then(result =>{ console.log(result)}).catch(err=>{console.log(err)});

app.use(errorsController.error404)

//module.exports = path.dirname(require.main.filename);
app.listen(8080);