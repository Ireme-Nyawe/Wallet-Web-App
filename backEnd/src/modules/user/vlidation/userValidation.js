import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const forgotPasswordSchema = Joi.object({
    email: Joi.string().required().messages({
        "any.required": "The email field is required."
    })
});

export const resetPasswordSchema = Joi.object({
    userId: Joi.string().required(),
    OTP: Joi.string().min(6).required(),
    password: Joi.string().min(8).required().messages({
        "string.min": "The password must be at least 8 characters long.",
        "any.required": "The password field is required."
    })
})

export const checkOTPValiditySchema = Joi.object({
    userId: Joi.string().required(),
    OTP: Joi.string().min(6).required(),
})