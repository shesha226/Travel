import Joi from 'joi';

export const createExperienceDTO = Joi.object({
    title: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Title is required',
            'string.min': 'Title must be at least 2 characters long',
            'string.max': 'Title cannot exceed 100 characters',
            'any.required': 'Title is required'
        }),

    location: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Location is required',
            'string.min': 'Location must be at least 2 characters long',
            'string.max': 'Location cannot exceed 100 characters',
            'any.required': 'Location is required'
        }),

    image_url: Joi.string()
        .uri()
        .required()
        .messages({
            'string.empty': 'Image URL is required',
            'string.uri': 'Please enter a valid URL',
            'any.required': 'Image URL is required'
        }),

    description: Joi.string()
        .min(10)
        .max(500)
        .required()
        .messages({
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 10 characters long',
            'string.max': 'Description cannot exceed 500 characters',
            'any.required': 'Description is required'
        }),

    price: Joi.number()
        .min(0)
        .optional()
        .messages({
            'number.base': 'Price must be a number',
            'number.min': 'Price cannot be negative'
        })
});

export const updateExperienceDTO = Joi.object({
    title: Joi.string()
        .min(2)
        .max(100)
        .optional()
        .messages({
            'string.min': 'Title must be at least 2 characters long',
            'string.max': 'Title cannot exceed 100 characters'
        }),

    location: Joi.string()
        .min(2)
        .max(100)
        .optional()
        .messages({
            'string.min': 'Location must be at least 2 characters long',
            'string.max': 'Location cannot exceed 100 characters'
        }),

    image_url: Joi.string()
        .uri()
        .optional()
        .messages({
            'string.uri': 'Please enter a valid URL'
        }),

    description: Joi.string()
        .min(10)
        .max(500)
        .optional()
        .messages({
            'string.min': 'Description must be at least 10 characters long',
            'string.max': 'Description cannot exceed 500 characters'
        }),

    price: Joi.number()
        .min(0)
        .optional()
        .messages({
            'number.base': 'Price must be a number',
            'number.min': 'Price cannot be negative'
        })
});