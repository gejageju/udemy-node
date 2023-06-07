const express= require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

const products = [];

router.get('/add-product',adminController.getAddProducts);
router.get('/products',adminController.getProducts);
router.post('/add-product',adminController.postProducts);
router.post('/edit-product',adminController.postEditProduct);
router.get('/edit-product/:productId',adminController.getEditProducts);
router.post('/delete-product',adminController.postDeleteProduct);
module.exports = router;