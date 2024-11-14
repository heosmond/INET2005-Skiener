import express from 'express';

const router = express.Router();

// get all products (../products/all)
router.get('/all', async (req, res) => {
    res.send("no product");
});

// get product by id (../products/:id)
router.get('/:id', async (req, res) => {
    let id = req.params.id
    res.send(id);
});

// purchase
router.post('/purchase', async (req, res) => {

});

export default router;