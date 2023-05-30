const fs = require('fs')
const path= require('path')
const rootDir = require('../util/path')
const path_ = path.join(rootDir,'data','products.json');

const getProductsFromFile = (callb) =>{
        fs.readFile(path_ , (err,fileContent)=>{
            if (err) callb([]);
            else callb(JSON.parse(fileContent));
    
        });
}

module.exports = class Product {

    constructor (title)
    {
        this.title = title;
    }

    save()
    {
            getProductsFromFile((prods)=>{
                prods.push(this);
                fs.writeFile(path_,JSON.stringify(prods), (err)=>{
                console.log(err);
            })
            })  
    }

    static fetchAll(callb)
    {    getProductsFromFile(callb);
    }
}