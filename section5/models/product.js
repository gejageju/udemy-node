const db=require('../util/database.js')
const Cart = require('./cart')



module.exports = class Product {

    constructor (id,title,imageUrl,description,price)
    {   this.id=id
        this.title = title;
        this.imageUrl = imageUrl;
        this.description=description;
        this.price=price;
    }

    save()
    {             
        return db.execute('insert into products (title,price,description,imageUrl) values (?,?,?,?)',
        [this.title,this.price,this.description,this.imageUrl]
        );   
    }

    static deleteById(id)
    {   

    }

    static fetchAll(callb)
    {    
        return db.execute('SELECT * from products');
    }

    static findById(id){
        return db.execute('SELECT * from products where products.id=?',[id]);
    }
}