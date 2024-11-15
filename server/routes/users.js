import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js';

const router = express.Router();
const prisma = new PrismaClient();

//Customer table: customer_id, email, password, first_name, last_name

// signup (../users/signup)
router.post('/signup', async (req, res) => {
    const {email, password, firstName, lastName} = req.body;

    //400 if empty fields
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).send('Missing required fields');
    }

    //400 if existing user
    const existingUser = await prisma.customer.findUnique({
        where: {
            email: email
        }
    });
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    //hash the password
    const hashedPassword = await hashPassword(password);

    //add user to database
    const user = await prisma.customer.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: hashedPassword
        },
    });

    //send response
    res.json({'user' : email}).status(200);
});


// login (../users/login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    //400 if fields left empty
    if(!email || !password) {
        return res.status(400).send('Missing required fields');
    }

    //400 if user does not exist
    const existingUser = await prisma.customer.findUnique({
        where: {
            email: email
        }
    });
    if (!existingUser) {
        return res.status(400).send('User not found');
    }

    //401 if password is incorrect
    const passwordMatch = await comparePassword(password, existingUser.password);
    if (!passwordMatch){
        return res.status(401).send('Invalid password');
    }

    res.json({ 'user' : email}).status(200);
});


// logout (../users/logout)
router.post('/logout', async (req, res) => {
    res.send("logout");
});

// get user session (../users/getSession)
router.get('/getSession', async (req, res) => {
    res.send("get session");
});

export default router;