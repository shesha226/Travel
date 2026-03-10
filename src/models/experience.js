import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Experience title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [100, "Title cannot exceed 100 characters"]
    },

    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
        minlength: [2, "Location must be at least 2 characters long"]
    },

    image_url: {
        type: String,
        required: [true, "Image URL is required"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: [10, "Description must be at least 10 characters long"],
        maxlength: [500, "Description cannot exceed 500 characters"]
    },

    price: {
        type: Number,
        required: false,
        min: [0, "Price cannot be negative"]
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
