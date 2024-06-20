const User = require('../models/User');

// controller function to get user profile
exports.getUserProfile = async (req, res) => {
    try {
        // find user by ID, exclude password from response
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// controller function to get user profile pt2
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// controller function to update user profile
exports.updateUserProfile = async (req, res) => {
    const { username, password } = req.body;

    try {
        // find user by ID
        let user = await User.findById(req.user.id);

        if (username) user.username = username;
        if (password) {
            // hash new password before saving
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // save updated user
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// controller function to update user profile pt2
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


// controller function to change user password
exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        // find user by ID
        const user = await User.findById(req.user.id);

        // check if current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Current password is incorrect'});
        }

        // hash new password before saving
        const salt = await bcyprt.genSalt(10);
        user.password = await bcyprt.hash(newPassword, salt);

        // save updated user
        await user.save();
        res.json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};