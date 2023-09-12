import Joi from "joi";

export const createUserSchema = Joi.object ({
  name: Joi.string().required()
    .min(2)
    .max(50),
  lastName: Joi.string().required()
    .min(2)
    .max(50),
  email: Joi.string().required()
    .email({
      minDomainSegments: 2
    }),
  country: Joi.string().required(),
  photo: Joi.string().required()
    .uri(),
  password: Joi.string().required()
    .min(8)
    .max(35)
    .alphanum(),
})