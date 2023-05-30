const Product = require('../models/product');

exports.getCart = (req,res,next)=>{
    res.render('shop/cart',{docTitle : 'Your Cart', path : '/cart'});
};

exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{docTitle : 'Checkout', path : '/checkout'});
};

exports.getProducts = (req,res,next)=>{
    Product.fetchAll( (products)=>{
        res.render('shop/product-list',{products : products, docTitle : 'All products', path : '/products'});
    });
    
};

exports.getIndex = (req,res,next)=>{
    Product.fetchAll( (products)=>{
        res.render('shop/index',{products : products, docTitle : 'Shop', path : '/'});
    });
};

exports.getOrders = (req,res,next)=>{
    res.render('shop/orders',{docTitle : 'Your orders', path : '/orders'});
}