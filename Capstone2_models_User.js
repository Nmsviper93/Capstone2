const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define schema for user
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    favorites: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
        }
    ]
});

// hash password before saving the user
UserSchema.pre('save', async function (next) {

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', UserSchema);