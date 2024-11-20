import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// get all products (../products/all)
router.get('/all', async (req, res) => {
    const products = await prisma.product.findMany();
    res.send(products);
});

// get product by id (../products/:id)
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    
    //id NaN - return 400
    if (isNaN(id)) {
        return res.status(400).send("Provide a valid ID number");
    }

    //does id exist?
    const item = await prisma.product.findUnique({
        where: {
            product_id: parseInt(id)
        }
    })

    //no - return 404
    if (!item) {
        res.status(404).send(`Product (ID: ${id}) not found`);
    } 
    else {
        //yes - return product
        res.send(item);
    }
});

// purchase
router.post('/purchase', async (req, res) => {

});

export default router;