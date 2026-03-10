import mongoose from "mongoose";
import bcrypt from "bcrypt";



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },

    contact_number: {
        type: String,
        required: [true, 'Contact number is required'],
        trim: true,
        match: [/^[\d\s\-\+\(\)]+$/, 'Contact number can only contain digits, spaces, and phone symbols'],
        minlength: [10, 'Contact number must be at least 10 characters long'],
        maxlength: [20, 'Contact number cannot exceed 20 characters']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        validate: {
            validator: function (password) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
            },
            message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
        }
    },

    nic: {
        type: String,
        required: [true, 'NIC is required'],
        unique: true,
        trim: true,
        minlength: [10, 'NIC must be at least 10 characters long'],
        maxlength: [12, 'NIC cannot exceed 12 characters'],
        match: [/^[a-zA-Z0-9]+$/, 'NIC can only contain letters and numbers']
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;