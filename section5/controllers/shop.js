const Product = require('../models/product');
const Cart=require('../models/cart.js')

exports.getCart = (req,res,next)=>{
    Cart.getCart(cart => {
        Product.fetchAll(products =>{
            const cartProducts=[];
            for (product of products){
                const cartProductData=cart.products.find(prod => prod.id ===product.id);
                if (cartProductData)
                {
                    cartProducts.push({productData : product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart',{
                pageTitle : 'Your Cart', 
                path : '/cart',
                products: cartProducts});
        });
    })
    
};

exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{pageTitle : 'Checkout', path : '/checkout'});
};

exports.getProducts = (req,res,next)=>{
    Product.fetchAll( (products)=>{
        res.render('shop/product-list',{products : products, pageTitle : 'All products', path : '/products'});
    });
    
};

exports.getIndex = (req,res,next)=>{
    Product.fetchAll( (products)=>{
        res.render('shop/index',{products : products, pageTitle : 'Shop', path : '/'});
    });
};

exports.getOrders = (req,res,next)=>{
    res.render('shop/orders',{pageTitle : 'Your orders', path : '/orders'});
}

exports.getProduct= (req,res,next)=>{
    const prodId = req.params.productId;
    Product.findById(prodId, (product)=>{
        res.render('shop/product-detail',{pageTitle : product.title, product: product, path:'/products' });
    })
    
}

exports.postCart = (req,res,next)=>{
    const prodId= req.body.productId;
    Product.findById(prodId, (product)=>{
        Cart.addProduct(prodId,product.price)
    });
    res.redirect('/cart');
}

exports.postCartDeleteProduct= (req,res,next)=>{
    const prodId= req.body.productId;
    Product.findById(prodId, product=>{
        Cart.deleteProduct(prodId,product.price)
        res.redirect('/cart');
    });
    
}