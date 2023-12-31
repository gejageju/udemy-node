const Product = require('../models/product');
const Cart = require('../models/cart')

exports.postProducts = (req,res,next)=>{
    const title= req.body.title
    const imageUrl=  req.body.imageUrl
    const description= req.body.description
    const price = req.body.price
    const product = new Product(null,title,imageUrl,description,price);
    product.save().then(()=>{
        res.redirect('/');
    }).catch(err=>{console.log(err);});
    
};


exports.getAddProducts= (req,res,next)=>{
    res.render('admin/edit-product',{
        pageTitle : 'Add Product',
        path : '/admin/add-product',
        editing : false});
};

exports.getEditProducts= (req,res,next)=>{
    const editMode = req.query.edit;
    if(!editMode) return res.redirect('/');

    const prodId=req.params.productId;
    Product.findById(prodId, product =>{
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product',{
        pageTitle : 'Edit Product',
        path : '/admin/edit-product',
        editing : editMode,
        product:product});
        
    })
   
};


exports.getProducts = (req,res,next)=>{
    Product.fetchAll( (products)=>{
        res.render('admin/products',{products : products, pageTitle : 'Admin products', path : '/admin/products'});
    });
}

exports.postEditProduct = (req,res,next)=>{
    console.log(req.body)
    const prodId = req.body.productId;
    const title= req.body.title
    const imageUrl=  req.body.imageUrl
    const description= req.body.description
    const price = req.body.price
   const product = new Product(
        prodId,title,imageUrl,description,price);
    product.save();
    res.redirect('/')

};

exports.postDeleteProduct = (req,res,next)=>{
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');

}

