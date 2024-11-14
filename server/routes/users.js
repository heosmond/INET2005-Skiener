import express from 'express';

const router = express.Router();

// signup (../users/signup)
router.post('/signup', async (req, res) => {
    res.send("signup");
});

// login (../users/login)
router.post('/login', async (req, res) => {
    res.send("login");
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