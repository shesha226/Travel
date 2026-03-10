import Joi from 'joi';


export const registerUserDTO = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .pattern(/^[a-zA-Z\s]+$/)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 50 characters',
            'string.pattern.base': 'Name can only contain letters and spaces',
            'any.required': 'Name is required'
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email address',
            'any.required': 'Email is required'
        }),

    contact_number: Joi.string()
        .min(10)
        .max(20)
        .pattern(/^[\d\s\-\+\(\)]+$/)
        .required()
        .messages({
            'string.empty': 'Contact number is required',
            'string.min': 'Contact number must be at least 10 characters long',
            'string.max': 'Contact number cannot exceed 20 characters',
            'string.pattern.base': 'Contact number can only contain digits, spaces, and phone symbols',
            'any.required': 'Contact number is required'
        }),

    password: Joi.string()
        .min(6)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
            'any.required': 'Password is required'
        }),

    nic: Joi.string()
        .min(10)
        .max(12)
        .pattern(/^[a-zA-Z0-9]+$/)
        .required()
        .messages({
            'string.empty': 'NIC is required',
            'string.min': 'NIC must be at least 10 characters long',
            'string.max': 'NIC cannot exceed 12 characters',
            'string.pattern.base': 'NIC can only contain letters and numbers',
            'any.required': 'NIC is required'
        })
});


export const loginUserDTO = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
});


export const updateUserDTO = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .pattern(/^[a-zA-Z\s]+$/)
        .optional()
        .messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 50 characters',
            'string.pattern.base': 'Name can only contain letters and spaces'
        }),

    contact_number: Joi.string()
        .min(10)
        .max(20)
        .pattern(/^[\d\s\-\+\(\)]+$/)
        .optional()
        .messages({
            'string.min': 'Contact number must be at least 10 characters long',
            'string.max': 'Contact number cannot exceed 20 characters',
            'string.pattern.base': 'Contact number can only contain digits, spaces, and phone symbols'
        }),

    nic: Joi.string()
        .min(10)
        .max(12)
        .pattern(/^[a-zA-Z0-9]+$/)
        .optional()
        .messages({
            'string.min': 'NIC must be at least 10 characters long',
            'string.max': 'NIC cannot exceed 12 characters',
            'string.pattern.base': 'NIC can only contain letters and numbers'
        })
});