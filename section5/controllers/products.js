const Product = require('../models/product');
exports.getAddProducts= (req,res,next)=>{
    res.render('add-product',{docTitle : 'Add Product',path : 'admin/add-product'})
};

exports.postProducts = (req,res,next)=>{
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req,res,next)=>{
    Product.fetchAll( (products)=>{
        res.render('shop',{products : products, docTitle : 'Shop', path : '/'});
    });
    
};