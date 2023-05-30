const express= require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

const products = [];

router.get('/add-product',adminController.getAddProducts);
router.get('/products',adminController.getProducts);
router.post('/add-product',adminController.postProducts);
router.get('/edit-product',adminController.postEditProduct);

module.exports = router;