const express = require('express');
const { getUserProfile, updateUserProfile, changePassword } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');

// secret key for JWT
const secretKey = 'jwt_secret_key';

// middleware to verify JWT token
const verifyToken = (req, res, next) => {
    // get Authorization header, deny access if no header
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'Access denied' });

    // extract token from Authorization header, deny access if no token
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        // verify token, attach verified token payload to request, proceed to next middleware/route handler
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// endpoint to refresh JWT token
router.post('/refresh-token', verifyToken, (req, res) => {
    const token = req.body.token;

    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        // verify token ignoring expiry, extract user data from token, sign new token with 1 hr expiry, send new token in response
        const verified = jwt.verify(token, secretKey, { ignoreExpiration: true });
        const user = { id: verified.id, username: verified.username };
        const newToken = jwt.sign(user, secretKey, { expiresIn: '1h' });
        res.json({ token: newToken });
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
});

// @route  GET request to api/user/profile
// @desc  get user profile
// @access  Private
router.get('/profile', auth, getUserProfile);

// @route  PUT request to api/user/profile
// @desc  update user profile
// @access  Private
router.put('/profile', auth, updateUserProfile);

// @route  PUT request to api/user/password
// @desc  change user password
// @access Private
router.put('/password', auth, changePassword);

// @route  GET request to api/user/:id
// @desc   get user profile by ID
// @access  private
router.get('/:id', auth, userController.getUserProfile);

// @route   PUT request to api/user/:id
// @desc    update user profile by ID
// @access  private
router.put('/:id', userController.updateUserProfile);

// @route  DELETE request to api/user/favorites/:id
// @desc  remove recipe from user's favorites
// @access  private
router.delete('/favorites/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // remove recipe from favorites
        user.favorites = user.favorites.filter(favId => favId.toString() !== req.params.id);
        await user.save();

        res.json({ message: 'Favorite removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;