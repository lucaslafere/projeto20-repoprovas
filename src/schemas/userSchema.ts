import joi from 'joi';

export const signUpSchema = joi.object({
    email: joi.string().email({tlds: { allow: false}}).required(),
    password: joi.string().min(10).required(),
    confirmPassword: joi.string().required().valid(joi.ref('password'))
});
export const loginSchema = joi.object({
    email: joi.string().email({tlds: { allow: false}}).required(),
    password: joi.string().min(10).required(),
});
