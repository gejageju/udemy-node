const Product = require('../models/product');

exports.postProducts = (req,res,next)=>{
    const title= req.body.title
    const imageUrl=  req.body.imageUrl
    const description= req.body.description
    const price = req.body.price
    const product = new Product(title,imageUrl,description,price);
    product.save();
    res.redirect('/');
};


exports.getAddProducts= (req,res,next)=>{
    res.render('admin/add-product',{docTitle : 'Add Product',path : '/admin/add-product'})
};

exports.getProducts = (req,res,next)=>{
    Product.fetchAll( (products)=>{
        res.render('admin/products',{products : products, docTitle : 'Admin products', path : '/admin/products'});
    });
}

exports.postEditProduct = (req,res,next)=>{
    res.render('admin/edit-product', { docTitle : 'Edit' , path : '/admin/edit-product' });
};

