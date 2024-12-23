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
    const { street, city, province, country, postal_code, credit_card, credit_expire, 
        credit_cvv, cart} = req.body;

    if (!req.session.customer_id) {
        return res.status(401).send("User is not logged in");
    }

    if (cart == null) {
        return res.status(400).send("Cart cannot be empty when checking out")
    }

    //Populate purchase table
    const purchase = await prisma.purchase.create({
        data: {
            customer_id: parseInt(req.session.customer_id),
            street: street,
            city: city,
            province: province,
            country: country,
            postal_code: postal_code,
            credit_card: credit_card,
            credit_expire: credit_expire,
            credit_cvv: credit_cvv,
        },
    });

    const productQuantities = new Map();

    cart.split(',').map(Number).forEach(id => {
        productQuantities.set(id, (productQuantities.get(id) || 0) + 1);
    });

    // Prepare data for purchaseItem table
    const data = Array.from(productQuantities.entries()).map(([id, amt]) => ({
        purchase_id: purchase.purchase_id,
        product_id: id,
        quantity: amt,
    }));

    const purchaseItem = await prisma.purchaseItem.createMany({
        data
    });

    res.send(data);
});

export default router;