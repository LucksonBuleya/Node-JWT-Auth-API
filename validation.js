//importing the user model and Joi for validation
import Joi from 'joi'; 

//Validate request body for registeration
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required()
            .trim(), // Remove leading and trailing whitespace
        email: Joi.string()
            .required()
            .email(), // Ensure the email is valid
        password: Joi.string()
                .min(6)
                .required(),
    });
    return schema.validate(data);
};

//Validate request body for login
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email(), // Ensure the email is valid
        password: Joi.string()
                .min(6)
                .required(),
    });
    return schema.validate(data);
};

export { registerValidation, loginValidation };