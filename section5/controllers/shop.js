const Product = require('../models/product');
const Cart=require('../models/cart.js')

exports.getCart = (req,res,next)=>{
    Product.fetchAll().then(
        ([rows,fieldData])=>{
            const products=rows;
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

        }
    ).catch(err=>{console.log(err);})
    
};

exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{pageTitle : 'Checkout', path : '/checkout'});
};

exports.getProducts = (req,res,next)=>{
    Product.fetchAll().then( ([rows,fieldData])=>{
        res.render('shop/product-list',{products : rows, pageTitle : 'All products', path : '/products'});
    }).catch(err => {console.log(err);});
    
};

exports.getIndex = (req,res,next)=>{
    Product.fetchAll().then( ([rows,fieldData])=>{
        res.render('shop/index',{products : rows, pageTitle : 'Shop', path : '/'});
    }).catch(err => {console.log(err);});

};

exports.getOrders = (req,res,next)=>{
    res.render('shop/orders',{pageTitle : 'Your orders', path : '/orders'});
}

exports.getProduct= (req,res,next)=>{
    const prodId = req.params.productId;
    Product.findById(prodId).then(
        ([product,fieldData])=>{
            res.render('shop/product-detail',{pageTitle : product.title, product: product[0], path:'/products' });
        }
    ).catch(err=>{console.log(err);})
    
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