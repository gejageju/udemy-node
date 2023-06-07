const fs = require('fs')
const path= require('path')
const rootDir = require('../util/path')
const path_ = path.join(rootDir,'data','products.json');
const Cart = require('./cart')

const getProductsFromFile = (callb) =>{
        fs.readFile(path_ , (err,fileContent)=>{
            if (err) callb([]);
            else callb(JSON.parse(fileContent));
    
        });
}

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
            
            getProductsFromFile((products)=>{

                if(this.id)
                {
                    const existingProductIndex = products.findIndex(prod => prod.id===this.id);
                    const updatedProducts = [...products];
                    updatedProducts[existingProductIndex]=this;  
                    fs.writeFile(path_,JSON.stringify(updatedProducts), (err)=>{
                        console.log(err);
                    })
                }
                else
                {this.id = Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1).toString()
                products.push(this);
                fs.writeFile(path_,JSON.stringify(products), (err)=>{
                console.log(err);
                });}
            })  
    }

    static deleteById(id)
    {   

        getProductsFromFile (products=>{
            const product= products.find(p=> p.id==id);
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(path_,JSON.stringify(updatedProducts), (err)=>{
                if (!err)
                {   console.log("ice")
                    Cart.deleteProduct(id,product.price)
                }
                });   
        });
    }

    static fetchAll(callb)
    {    getProductsFromFile(callb);
    }

    static findById(id,cb){
        getProductsFromFile (products=>{
            const product = products.find(p => p.id===id);
            cb(product);
        })
    }
}