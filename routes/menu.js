import { Router } from 'express';
import { getMenu, getProduct, addProduct, updateProduct, deleteProduct, searchProduct } from '../services/menu.js';
import Product from '../models/product.js';
import { authorizeUser } from '../middlewares/adminAuth.js';

const router = Router();

router.get('/', async (req, res, next) => {
    const menu = await getMenu();
    if (menu) {
        res.json({
            success: true,
            menu: menu
        });
    } else {
        next({
            status: 404,
            message: 'Menu not found'
        });
    }
});

//search måste vara innan '/:prodId'
router.get('/search', async (req, res, next) => {
    try {
        const title = req.query.query;
        const results = await searchProduct(title);

        if (results) {
            res.json({
                success: true,
                results: results
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Product not found, title: ${title}`

            });
        }
    } catch (error) {
        next({
            status: 500,
            message: `Something went wrong: ${error.message}`
        });
    }
});


router.get('/:prodId', async (req, res, next) => {
    const { prodId } = req.params;
    const product = await getProduct(prodId);
    if (product) {
        res.json({
            success: true,
            product: product
        });
    } else {
        next({
            status: 404,
            message: 'Product not found'
        });
    }
});

router.post('/', authorizeUser('admin'), async (req, res, next) => {
    console.log('request body: ', req.body)
    try {
        const result = await addProduct(req.body);
        res.json({
            success: true,
            result: result
        });
    } catch (error) {      
            res.status(500).json({
                success: false,
                message: 'Error: ' + error.message
            });
    }
});

router.put('/:prodId', authorizeUser('admin'), async (req, res, next) => {
    try {
        const result = await updateProduct(req.params.prodId, req.body);
        if (result) {
            res.json({
                success: true,
                result: result
            });
        } else {
            next({
                status: 404,
                message: 'Product update failed'
            });
        }
    } catch (error) {
        next({
            status: 500,
            message: error.message
        });
    }
});

router.delete('/:prodId', authorizeUser('admin'), async (req, res, next) => {
    try {
        const result = await deleteProduct(req.params.prodId);
        if (result) {
            res.json({
                success: true,
                result: result
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
    } catch (error) {
        next({
            status: 500,
            message: `No product with id ${req.params.prodId} found`
        });
    }
});


export default router;