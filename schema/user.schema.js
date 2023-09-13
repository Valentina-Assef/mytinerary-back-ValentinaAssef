import Joi from "joi";

const email = Joi.string().required()
  .email({
    minDomainSegments: 2
  })
  .message({
    "any.required": "Email required"
  });

const password = Joi.string().required()
  .min(8)
  .max(35)
  .alphanum();

export const createUserSchema = Joi.object ({
  name: Joi.string().required()
    .min(2)
    .max(50),
  lastName: Joi.string()
    .min(2)
    .max(50),
  email,
  country: Joi.string(),
  photo: Joi.string()
    .uri(),
  password,
})

export const userSignUp = Joi.object ({
  name: Joi.string().required()
    .min(2)
    .max(50),
  lastName: Joi.string()
    .min(2)
    .max(50),
  email,
  country: Joi.string(),
  photo: Joi.string()
    .uri(),
  password,
})

export const userSignIn = Joi.object ({
  email,
  password,
})