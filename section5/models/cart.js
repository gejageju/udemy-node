const fs = require('fs')
const path= require('path')
const rootDir = require('../util/path');
const { postDeleteProduct } = require('../controllers/admin');
const path_ = path.join(rootDir,'data','cart.json');

module.exports = class Cart {

    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(path_, (err, fileContent) => {
          let cart = { products: [], totalPrice: 0 };
          if (!err) {
            cart = JSON.parse(fileContent);
          }
          // Analyze the cart => Find existing product
          const existingProductIndex = cart.products.findIndex(
            prod => prod.id === id
          );
          const existingProduct = cart.products[existingProductIndex];
          let updatedProduct;
          // Add new product/ increase quantity
          if (existingProduct) {
            updatedProduct = { ...existingProduct };
            updatedProduct.qty = updatedProduct.qty + 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
          } else {
            updatedProduct = { id: id, qty: 1 };
            cart.products = [...cart.products, updatedProduct];
          }
          cart.totalPrice = cart.totalPrice + +productPrice;
          fs.writeFile(path_, JSON.stringify(cart), err => {
            console.log(err);
          });
        });
      }

      static deleteProduct (id,productPrice){
          fs.readFile(path_ , (err,fileContent)=>{
            if(err) {return};
            let cart=JSON.parse(fileContent);
            const updatedCart={...cart};
            let product=updatedCart.products.find(prod => prod.id===id);
            if(!product) return;
            const productQty = product.qty;
            updatedCart.totalPrice= updatedCart.totalPrice- productPrice* productQty;
            updatedCart.products=updatedCart.products.filter (p => p.id!==id);
            fs.writeFile(path_, JSON.stringify(updatedCart), err => {
              console.log(err);
            });


          })
      }

      static getCart(cb){
        fs.readFile(path_ ,(err,fileContent)=>{
          const cart = JSON.parse(fileContent);
          if(err){
            cb(null);
          }
          cb(cart);
        });
      };

}